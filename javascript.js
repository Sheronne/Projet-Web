var date = new Date();
var tableau = new Vue({
    el: '#main',
    data: {
        elementsPerPage: 10,
        elementsPerPageOptions: [10, 20, 30],
        currentPage: 1,
        ascending: false,
        sortColumn: '',
        showModal: false,
        // filOptions:['ID','Titre','Resume','Affectation','Client','Etat'],
        col: {
            ID: '',
            Titre: '',
            Resume: '',
            Affectation: '',
            Client: '',
            Etat: '',
            Date: '',
        },
        row: {
            id: '',
            titre: '',
            resume: '',
            affectation: '',
            client: '',
            etat: '',
            date: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes(),
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
            if (JSON.parse(localStorage.getItem('allrows')) != null) {
                this.rows = JSON.parse(localStorage.getItem('allrows'));
            }
            // for (var i = 0; i <= this.rows.length; i++) {
            //     this.row.supprimer.innerHTML = '<input type="checkbox" name="del"/>';
            // }
        },
        "onSubmit": function onSubmit() {
        },
        "removeRow": function removeRow(index) {
            ///var result = window.confirm("You are about to delete select rows. Are you sure?");
            var result = true;
            if (result) {
                var index = this.rows.indexOf(index);
                if (index === -1) {
                    return;
                }
                this.rows.splice(index, 1);
            }
            localStorage.setItem('allrows', JSON.stringify(this.rows));
        },
        // "removeRow": function removeRow(checkbox) {
        //     for (var i = 0; i <= this.rows.length; i++) {
        //         let checkbox = document.querySelector('#delbox');
        //         console.log(checkbox);
        //         if (checkbox) {
        //             this.$delete(this.rows);
        //         }
        //     }
        //     localStorage.setItem('allrows', JSON.stringify(this.rows));
        // },
        // "removeRow": function removeRow(index) {
        //     for (let i = this.rows.length - 1; i = 0; i--) {
        //         if (this.rows[i].id === id) {
        //             this.$delete(this.rows, index);
        //         }
        //     }
        //     localStorage.setItem('allrows', JSON.stringify(this.rows));
        // },
        "removeThisRow": function removeThisRow(index) {
            this.$delete(this.rows, index);
            localStorage.setItem('allrows', JSON.stringify(this.rows));
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
        // "searchArray": function searchArray() {
        //     // Declare variables
        //     var input, filter, table, tr, td, i;
        //     input = document.getElementById("myInput");
        //     filter = input.value.toUpperCase();
        //     table = document.getElementById("tab");
        //     tr = table.getElementsByTagName("tr");
        //     // Loop through all table rows, and hide those who don't match the search query
        //     for (i = 0; i < this.rows.length; i++) {
        //         td = this.rows.length[0];
        //         if (td) {
        //             if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        //                 tr[i].style.display = "";
        //             } else {
        //                 tr[i].style.display = "none";
        //             }
        //         }
        //     }
        // },
        "resPage": function resPage() {
            this.currentPage = 1;
        },
        "num_pages": function num_pages() {
            return Math.ceil(this.rows.length / this.elementsPerPage);
        },
        "get_rows": function get_rows() {
            const start = (this.currentPage - 1) * this.elementsPerPage;
            var end = start + this.elementsPerPage;
            return this.rows.slice(start, end);
        },
        "change_page": function change_page(page) {
            this.currentPage = page;
        }
    },
    computed: {
        "columns": function columns() {
            if (this.rows.length == 0) {
                return ['ID', 'Titre', 'Resume', 'Affectation', 'Client', 'Etat', 'Date'];
            }
            return Object.keys(this.rows[0])
        },
    }
});

// register modal component
Vue.component('modal', {
    template: '#modal-template'
  })
  
  // start app
  new Vue({
    el: '#app',
    data: {
      showModal: false
    }
  })
