import * as React from 'react';

interface IUserDetail {
    model: string, 
}

class UserRow extends React.Component<any, IUserDetail> {
    state = {
        model: '',
    };

    public getDetail = (e: any) => {
        e.preventDefault();
        const { id } = this.props.obj;
        fetch(`api/users/${id}/edit`)
            .then(res => res.json());
    }

    public handleDelete = (e: any) => {
        e.preventDefault()
        // if (!confirm('Are your sure you want to delete this item?')) {
        //     return false
        // }

        const { id, index } = this.props.obj;

        fetch(`api/users/${id}`, {
            method: 'delete',
        })
        .then(res => res.json())
        .then(data => this.props.deleteRow(index))
        .catch(err => console.log(err));
        //this.props.deleteRow(this.props.index)
    }
    
    public render() {
        const { id, name, email, created_at } = this.props.obj;
        return (
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{created_at}</td>
                <td>
                    <button className='btn btn-primary' onClick={this.getDetail}>Edit</button>
                </td>
                <td>
                    <button className='btn btn-danger' onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        )
    }
}

export default UserRow