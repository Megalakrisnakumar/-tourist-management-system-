import React, { useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';



const AccommodationTable = () => {

    // http://localhost:8000/api/v1/accomondation/
    const { data } = useFetch(`${BASE_URL}/accomondation/getAll`);
    console.log(data);



    const handleDelete = (id) => {
        console.log(id);

        fetch(`${BASE_URL}/accomondation/${id}`, {
            method:"DELETE",
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
        }

        ).then(res=>res.json().then(()=>{
            if ((res.ok)) {
                
              console.log("Deleted");
                              
            }
        }))


    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Accommodation List</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.headerCell}>Name</th>
                        <th style={styles.headerCell}>Location</th>
                        <th style={styles.headerCell}>Price per Night</th>
                        <th style={styles.headerCell}>Available Rooms</th>
                        <th style={styles.headerCell}>Amenities</th>
                        <th style={styles.headerCell}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((acc) => (
                        <tr key={acc._id} style={styles.row}>
                            <td style={styles.cell}>{acc.name}</td>
                            <td style={styles.cell}>{acc.location}</td>
                            <td style={styles.cell}>${acc.pricePerNight}</td>
                            <td style={styles.cell}>{acc.availableRooms}</td>
                            <td style={styles.cell}>{acc.amenities.join(', ')}</td>
                            <td style={styles.cell}>
                                <button
                                    style={styles.deleteButton}
                                    onClick={() => handleDelete(acc._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        padding: "30px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "1200px",
        margin: "auto",
        marginTop: "20px"
    },
    header: {
        textAlign: "center",
        color: "#333",
        fontFamily: "'Roboto', sans-serif",
        fontSize: "32px",
        marginBottom: "20px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        overflow: "hidden"
    },
    headerCell: {
        padding: "12px 18px",
        backgroundColor: "#007BFF",
        color: "#fff",
        textAlign: "left",
        fontSize: "16px",
        fontWeight: "bold",
        letterSpacing: "0.5px",
        textTransform: "uppercase"
    },
    row: {
        backgroundColor: "#fff",
        borderBottom: "1px solid #ddd",
        transition: "background-color 0.3s ease-in-out"
    },
    cell: {
        padding: "12px 18px",
        textAlign: "left",
        fontSize: "14px",
        color: "#555",
    },
    deleteButton: {
        backgroundColor: "#FF5733",
        color: "#fff",
        border: "none",
        padding: "8px 12px",
        cursor: "pointer",
        fontSize: "14px",
        borderRadius: "4px",
        transition: "background-color 0.3s ease-in-out"
    },
    deleteButtonHover: {
        backgroundColor: "#FF3300"
    }
};

export default AccommodationTable;
