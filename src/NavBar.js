import React, { Component } from "react"; 
export default class NavBar extends Component {
    // Set initial state
    state = {
        searchTerms: ""
    }
    /**
     * Local search handler, which invokes the searchHandler reference
     * passed from App
     */
    search = (e) => {
        if (e.charCode === 13) {
            this.props.searchHandler(this.state.searchTerms)
            this.setState({ searchTerms: "" })
        }
    }
    LoginLogout = () => {
        if (this.props.activeUser === null) {
            return <a className="nav-link" id="nav__login"
                onClick={this.props.viewHandler} href="#">Login</a>
        } else {
            return <a className="nav-link" id="nav__logout"
                onClick={this.props.viewHandler} href="#">Logout</a>
        }
    }
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    render() {
        return (
            <nav className="navbar is-fixed-top" role="navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io" onClick={this.props.viewHandler}>
                    </a>
                    <input id="searchTerms"
                        value={this.state.searchTerms}
                        onChange={this.handleFieldChange}
                        onKeyPress={this.search}
                        className="form-control w-100"
                        type="search"
                        
                        placeholder="Search"
                        aria-label="Search" />
                    <ul className="navbar-nav px-3">
                        <li className="nav-item text-nowrap">
                            <a className="nav-link"
                                id="nav__profile"
                                //     onClick={this.props.viewHandler} 
                                href="#">
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-item">
                        <li className="nav-item">
                            <this.LoginLogout />
                        </li>
                    </ul>
                    <button >Home</button>
                    <button>Artists</button>
                    <button>Festivals</button>

                    </div>
            </nav>
        )
    }
}