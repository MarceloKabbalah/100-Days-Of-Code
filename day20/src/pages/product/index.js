import React, { Component } from "react";
import api from '../../services/api';

import "./styles.scss";

export default class Product extends Component {
    state = {
        Product: {},
    };

    async componentDidMount() {
        const { id } = this.props.match.params;

        const response = await api.get(`/products/${id}`);

        this.setState({ product: response.data });
    }

    render() {
        const { product } = this.state;

        return (
            <div>
                <h1>{product.title}</h1>
                <a>{product.description}</a>

                <p>
                    URL: <a href={product.url}>{product.url}</a>
                </p>
            </div>

        );
        
    }
} 
