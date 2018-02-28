var date = new Date();
var tableau = new Vue({
    el: '#main',
    data: {
        currentPage: 1,
        elementsPerPage: 20,
        ascending: false,
        sortColumn: '',
        col: {
            ID: '',
            Titre: '',
            Resume: '',
            Affectation: '',
            Client: '',
            Etat: '',
            Supprimer: ''
        },
        row: {
            id: '',
            titre: '',
            resume: '',
            affectation: '',
            client: '',
            etat: '',
            date: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes()
        },
        rows: []
    },
    mounted: function () {
        this.on_load()
    },
    methods: {
        "addRow": function addRow() {
            var obj = ({ ID: this.row.id, Titre: this.row.titre, Resume: this.row.resume, Affectation: this.row.affectation, Client: this.row.client, Etat: this.row.etat, Date: this.row.date });
            this.rows.push(obj);
            localStorage.setItem('allrows', JSON.stringify(this.rows));
        },
        "on_load": function on_load() {
            if (JSON.parse(localStorage.getItem('allrows')) != null)
                this.rows = JSON.parse(localStorage.getItem('allrows'));
        },
        "onSubmit": function onSubmit() {
        },
        "removeRow": function removeRow(index) {
            this.itemList.splice(index, 1)
        },
        "sortTable": function sortTable(col) {
            if (this.sortColumn === col) {
                this.ascending = !this.ascending;
            } else {
                this.ascending = true;
                this.sortColumn = col;
            }
            var ascending = this.ascending;
            this.rows.sort(function (a, b) {
                if (a[col] > b[col]) {
                    return ascending ? 1 : -1
                } else if (a[col] < b[col]) {
                    return ascending ? -1 : 1
                }
                return 0;
            })
        },
        "num_pages": function num_pages() {
            return Math.ceil(this.rows.length / this.elementsPerPage);
        },
        "get_rows": function get_rows() {
            var start = (this.currentPage - 1) * this.elementsPerPage;
            var end = start + this.elementsPerPage;
            return this.rows.slice(start, end);
        },
        "change_page": function change_page(page) {
            this.currentPage = page;
        },
    },
    computed: {
        "columns": function columns() {
            if (this.rows.length == 0) {
                return [];
            }
            return Object.keys(this.rows[0])
        }
    }
});
