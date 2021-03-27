import React, { useState, Fragment } from "react";

const InputAnime = () => {
    const [description, setDescription] = useState("Hello");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch("http://localhost:5000/new", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">PERN Anime List</h1>
            <form onSubmit={onSubmitForm} className="d-flex mt-5 p-5">
                <input
                    className="form-control"
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
};

export default InputAnime;
