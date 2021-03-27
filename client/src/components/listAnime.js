import React, { Fragment, useEffect, useState } from "react";
import EditAnime from "./editAnime";

const ListAnime = () => {
    const [anime, setAnime] = useState([]);

    const getAnime = async () => {
        try {
            const response = await fetch("http://localhost:5000/anime");
            const jsonData = await response.json();
            setAnime(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };

    const deleteAnime = async (id) => {
        try {
            const deletedAnime = await fetch(
                `http://localhost:5000/anime/${id}`,
                {
                    method: "DELETE",
                }
            );
            setAnime(anime.filter((item) => item.anime_id !== id));
            console.log(deletedAnime);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getAnime();
    }, []);
    return (
        <Fragment>
            <table class="table table-hover mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {anime.map((item) => {
                        return (
                            <tr key={item.anime_id}>
                                <td>{item.description}</td>
                                <td>
                                    <EditAnime anime={item} />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            deleteAnime(item.anime_id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListAnime;
