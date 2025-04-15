import { useState } from "react";
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';

const UnicornsView = ({
    handleAddUnicorn,
    handleEditUnicorn,
    handleDeleteUnicorn,
    unicorns,
}) => {
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [age, setAge] = useState("");
    const [power, setPower] = useState("");
    const [selectedUnicorn, setSelectedUnicorn] = useState(null);

    const onRowSelect = (e) => {
        const unicorn = e.value;
        if (!unicorn) return;

        setSelectedUnicorn(unicorn);
        setName(unicorn.name || "");
        setColor(unicorn.data?.color || "");
        setAge(unicorn.data?.age || "");
        setPower(unicorn.data?.power || "");
    };

    const onManualSelect = (unicorn) => {
        setSelectedUnicorn(unicorn);
        setName(unicorn.name || "");
        setColor(unicorn.data?.color || "");
        setAge(unicorn.data?.age || "");
        setPower(unicorn.data?.power || "");
    };

    const onAdd = () => {
        if (!name || !color || !age || !power) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        handleAddUnicorn({ name, color, age, power });
        clearForm();
    };

    const onEdit = () => {
        if (!selectedUnicorn?._id) {
            alert("Selecciona un unicornio para editar.");
            return;
        }

        if (!name || !color || !age || !power) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        handleEditUnicorn({ id: selectedUnicorn._id, name, color, age, power });
        clearForm();
    };

    const onDelete = () => {
        if (!selectedUnicorn?._id) {
            alert("Selecciona un unicornio para eliminar.");
            return;
        }

        handleDeleteUnicorn(selectedUnicorn._id);
        clearForm();
    };

    const clearForm = () => {
        setName("");
        setColor("");
        setAge("");
        setPower("");
        setSelectedUnicorn(null);
    };

    return (
        <div className="p-4">
            <h2>Gestión de Unicornios</h2>

            <div className="p-fluid p-formgrid p-grid mb-4">
                <div className="p-field p-col-12 p-md-3">
                    <label>Nombre</label>
                    <InputText value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="p-field p-col-12 p-md-3">
                    <label>Color</label>
                    <InputText value={color} onChange={(e) => setColor(e.target.value)} />
                </div>
                <div className="p-field p-col-12 p-md-2">
                    <label>Edad</label>
                    <InputNumber value={age} onValueChange={(e) => setAge(e.value)} />
                </div>
                <div className="p-field p-col-12 p-md-4">
                    <label>Poder</label>
                    <InputText value={power} onChange={(e) => setPower(e.target.value)} />
                </div>
            </div>

            <div className="mb-4 flex gap-2">
                <Button label="Agregar" icon="pi pi-plus" onClick={onAdd} />
                <Button label="Editar" icon="pi pi-pencil" onClick={onEdit} severity="warning" disabled={!selectedUnicorn} />
                <Button label="Eliminar" icon="pi pi-trash" onClick={onDelete} severity="danger" disabled={!selectedUnicorn} />
            </div>

            <DataTable
                value={unicorns}
                selectionMode="single"
                dataKey="_id"
                selection={selectedUnicorn}
                onSelectionChange={onRowSelect}
                paginator
                rows={5}
                responsiveLayout="scroll"
                emptyMessage="No hay unicornios aún."
            >
                <Column field="name" header="Nombre" />
                <Column field="data.color" header="Color" />
                <Column field="data.age" header="Edad" />
                <Column field="data.power" header="Poder" />
                <Column
                    header="Acciones"
                    body={(rowData) => (
                        <Button
                            icon="pi pi-check"
                            label="Seleccionar"
                            className="p-button-sm"
                            onClick={() => onManualSelect(rowData)}
                        />
                    )}
                />
            </DataTable>
        </div>
    );
};

export default UnicornsView;
