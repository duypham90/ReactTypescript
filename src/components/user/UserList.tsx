import * as React from 'react';
import { Link } from 'react-router-dom';
import UserRow from './UserRow';

interface IUser {
    id: number;
    name: string;
    email: number;
}

interface IUserListState {
    isLoading: boolean,
    limit: number,
    offset: number,
    total: number,
    users: IUser[],
    error: string,
    errorInfo: string
}

class UserList extends React.Component<{}, IUserListState> {
    state = {
        isLoading: false,
        limit: 11,
        offset: 0,
        total: 0,
        users: [],
        error: '',
        errorInfo: ''

    };

    public componentDidMount() {
        this.makeRequest()
    }

    componentDidCatch(error: any, errorInfo: any) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    }

    public makeRequest() {
        const { offset, limit } = this.state;

        fetch(`api/users?offset=${offset}&limit=${limit}`)
            .then(res => res.json())
            .then(list => this.setState({
                ...this.state,
                total: list.meta.total,
                users: list.data
            }));
    }

    public deleteRow = (key: number) => {
        const users = [...this.state.users];
        console.log(users);
        users.splice(key, 1);
        console.log(users);
        this.setState({ users });
    }

    public fetchRows() {
        return this.state.users.map((object, i) => {
            return <UserRow obj={ object } key={ i } index={ i } deleteRow={ this.deleteRow } />
        });
    }

    public handleChange = (event: any) => {
        const limit = event.target.value;
        this.setState((prevState) => ({
            ...prevState, limit
        }), () => {
            this.makeRequest();
        });
    }

    public render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <details style={ { whiteSpace: 'pre-wrap' } }>
                        {this.state.error && this.state.error.toString()}
                        <br />
                    </details>
                </div>
            );
        }

        return (
            <>
                <h1>Users</h1>
                <div className='clearfix'>
                    <Link className='btn btn-success pull-right' to='/users/create'>Add User</Link>
                </div><br />
                <div className="pull-right">
                    <select className="form-control" value={ this.state.limit } onChange={ this.handleChange }>
                        <option value="10">10</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                    </select>
                </div>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Created</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.fetchRows()}
                    </tbody>
                </table>
            </>
        )
    }
}
export default UserList
