import React, {createContext, useReducer} from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
    transactions: [],
    error: null,
    loading: true
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)

    function getTransactions() {
        axios.get('/api/v1/transactions').then((response) => {
            dispatch({
                type: 'GET_TRANSACTION',
                payload: response.data.data
            })
        }).catch((e) => {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: e.response.data.error
            })
        })
    }

    async function deleteTransaction(id) {
        axios.delete(`api/v1/transactions/${id}`).then((response) => {
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })
        }).catch((e) => {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: e.response.data.error
            })
        })
    }

    async function addTransaction(transaction) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios.post('api/v1/transactions', transaction, config).then((response) => {
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: response.data.data
            })
        }).catch((e) => {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: e.response.data.error
            })
        })
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        getTransactions,
        error: state.error,
        loading: state.loading,
    }}>
        {children}
    </GlobalContext.Provider>)
}