import React, { useState } from "react";
import { Button, Spinner } from "reactstrap";
import * as XLSX from "xlsx";

const BotonExcel = ({ data }) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = () => {
        setLoading(true);

        const libro = XLSX.utils.book_new();

        const hoja = XLSX.utils.json_to_sheet(data);

        XLSX.utils.book_append_sheet(libro, hoja, "Data");

        setTimeout(() => {
            XLSX.writeFile(libro, "Data.xlsx");
            setLoading(false);
        }, 1000);
    };

    return (
        <>
            {!loading ? (
                <Button color="success" onClick={handleDownload}>
                    Generar Excel
                </Button>
            ) : (
                <Button color="success" disabled>
                    <Spinner size="sm">Loading...</Spinner>
                    <span> Generando...</span>
                </Button>
            )}
        </>
    );
};

export default BotonExcel;
