import {useContext, useState} from "react";
import {GlobalContext} from "../context/GlobalState";

export const AddTransaction = () => {
    const [text, setText] = useState('')
    const [amount, setAmount] = useState(0)
    const {addTransaction} = useContext(GlobalContext)

    const submit = (e) => {
        e.preventDefault()
        const newTransaction = {
            text,
            amount
        }

        addTransaction(newTransaction)
    }
    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={submit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" id="text" value={text} onChange={(e) => setText(e.target.value)}
                           placeholder="Enter text..."/>
                </div>
                <div className="form-control">
                    <label htmlFor="amount"
                    >Amount <br/>
                        (negative - expense, positive - income)</label
                    >
                    <input type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))}
                           id="amount" placeholder="Enter amount..."/>
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    );
}