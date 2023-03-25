import { Component } from "react";

class ErrorBoundary extends Component {

    constructor() {
        super();
        this.state = {
            hasError: false
        }
    }

    /* ErrorBoundary component is an error boundary that is used to catch 
    the errors thrown by the child coponents that this ErrorBoundary 
    component wraps around. This error boundary is a term given to a class 
    based component that has the componentDidCatch() lifecycle method 
    defined. */
    componentDidCatch(error) {
        console.log(error);
        this.setState({hasError: true});
    }

    render() {
        // if(this.state.hasError) {
        //     return <p>Something went wrong!</p>
        // }
        return this.props.children;
    }
}

export default ErrorBoundary;