<template>
    <table class="ui celled compact table">
        <thead>
            <tr>
                <th v-for="c in this.columns">{{c}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="r in this.rows">
                <td v-for="d in r">{{d}}</td>
            </tr>
        </tbody>
        <tfoot v-if="page">
            <tr>
                <th :colspan="colspan">
                    <div class="ui right floated pagination menu">
                        <a class="icon item" @click="gotoPage(current_page-1)" v-bind:class="{ disabled: current_page==1 }">
                            <i class="left chevron icon"></i>
                        </a>
                        <a class="item" v-for="p in this.page_count" @click="gotoPage(p)" v-bind:class="{ active: current_page==p }">{{p}}</a>
                        <a class="icon item" @click="gotoPage(current_page+1)" v-bind:class="{ disabled: current_page==page_count }">
                            <i class="right chevron icon"></i>
                        </a>
                    </div>
                </th>
            </tr>
        </tfoot>
    </table>
</template>

<script>
export default {
    name: 'Table',
    props: ['source', 'paging'],
    data () {
        return {
            'rows': [],
            'columns': [],
            'colspan': 0,
            'page_count': 0,
            'all_rows': [],
            'current_page': 1,
            'page': 0
        }
    },
    methods: {
        gotoPage: function (pageNum) {
            if (pageNum < 1 || pageNum > this.page_count) {
                return
            }
            this.current_page = pageNum
            this.rows = this.all_rows.slice((pageNum - 1) * this.page, ((pageNum - 1) * this.page) + this.page)
            if (this.rows.length < this.page) {
                var row = []
                for (var i = 0; i < this.columns.length; i++) {
                    row.push('-')
                }
                var diff = this.page - this.rows.length
                for (var j = 0; j < diff; j++) {
                    this.rows.push(row)
                }
            }
        }
    },

    mounted: function () {
        var _this = this
        var diff = 0
        fetch(this.source)
            .then(function (response) {
                return response.json()
            }).then(function (json) {
                var columnCount = 0
                if (typeof (json.rows) !== 'undefined' && typeof (json.columns) !== 'undefined') {
                    for (i = 0; i < json.rows.length; i++) {
                        if (json.rows[i].length > columnCount) {
                            columnCount = json.rows[i].length
                        }
                    }
                    if (columnCount < json.columns.length) {
                        columnCount = json.columns.length
                    }
                    for (var i = 0; i < json.rows.length; i++) {
                        diff = columnCount - json.rows[i].length
                        if (diff > 0) {
                            for (var j = 0; j < diff; j++) {
                                json.rows[i].push('')
                            }
                        }
                    }
                    if (columnCount > json.columns.length) {
                        diff = columnCount - json.columns.length
                        for (var k = 0; k < diff; k++) {
                            json.columns.push('')
                        }
                    }
                    _this.columns = json.columns
                    _this.rows = json.rows
                    _this.all_rows = json.rows
                    _this.colspan = columnCount
                } else if (typeof (json.rows) === 'undefined' && typeof (json.columns) === 'undefined') {
                    for (i = 0; i < json.length; i++) {
                        if (json[i].length > columnCount) {
                            columnCount = json[i].length
                        }
                    }
                    for (i = 0; i < json.length; i++) {
                        diff = columnCount - json[i].length
                        if (diff > 0) {
                            for (j = 0; j < diff; j++) {
                                json[i].push('')
                            }
                        }
                    }
                    for (i = 1; i <= columnCount; i++) {
                        _this.columns.push('Column ' + i)
                    }
                    _this.rows = json
                    _this.all_rows = json
                    _this.colspan = columnCount
                } else {
                    console.warn('<ec-table> - Invalid JSON Source')
                }
                if (typeof (_this.paging) !== 'undefined') {
                    _this.page = parseInt(_this.paging)
                    _this.page_count = Math.ceil(_this.rows.length / _this.page)
                    _this.rows = _this.all_rows.slice(0, _this.page)
                }
            }).catch(function (ex) {
                console.warn('<ec-table> JSON parsing failed')
            })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
