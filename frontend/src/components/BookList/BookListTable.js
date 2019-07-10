import React, { Component } from 'react';
import sematable, { Table } from 'sematable';
import BookListTableActions from './BookListTableActions';

const columns = [
    { key: 'id', header: 'ID', sortable: true, searchable: true, primaryKey: true },
    { key: 'title', header: 'Title', sortable: true, searchable: true },
    { key: 'description', header: 'Description', searchable: true },
    { key: 'author', header: 'Author', sortable: true, searchable: true },
    { key: 'tags', header: 'Tags', sortable: true, searchable: true },
    { key: 'actions', header: 'Actions', Component: BookListTableActions },
];

class BookListTable extends Component {
    render() {
        return (
            <Table
                {...this.props}
                selectable
                columns={columns}
            />
        );
    }
}

// BookListTable.propTypes = propTypes;
export default sematable('allBooks', BookListTable, columns, {showFilter: false});
