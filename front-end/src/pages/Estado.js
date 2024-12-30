import React, { useState, useEffect, useRef } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { EstadoService } from '../service/EstadoService';

const Estado = () => {

    let emptyEstado = {
        id: null,
        nome: '',
        capital: '',
        regiao: '',
        sigla: ''
    };

    const [objetos, setObjetos] = useState(null);
    const [selectedObjetos, setSelectedObjetos] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);
    const objetoService = new EstadoService();

    useEffect(() => {
        if(objetos == null) {
            objetoService.listarTodos().then(res => {
                setObjetos(res.data)
            })
        }
    }, [objetos])


    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">ID</span>
                {rowData.id}
            </>
        );
    }

    const nomeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nome</span>
                {rowData.nome}
            </>
        );
    }

    const capitalBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Capital</span>
                {rowData.capital}
            </>
        );
    }

    const regiaoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Região</span>
                {rowData.regiao}
            </>
        );
    }

    const siglaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Sigla</span>
                {rowData.sigla}
            </>
        );
    }  
    
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciar estados</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Pesquise..." />
            </span>
        </div>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">                        

                    <DataTable ref={dt} value={objetos} selection={selectedObjetos} onSelectionChange={(e) => setSelectedObjetos(e.value)}
                        dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} estados."
                        globalFilter={globalFilter} emptyMessage="Nenhum estado encontrado." header={header} responsiveLayout="scroll">
                        <Column field="id" header="Id" body={idBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="nome" header="Nome" body={nomeBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="capital" header="Capital" body={capitalBodyTemplate} headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
                        <Column field="regiao" header="Região" body={regiaoBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="sigla" header="Sigla" body={siglaBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column> 
                        {/* <Column body={actionBodyTemplate}></Column> */}
                    </DataTable>  
                    
                    
                </div>
            </div>
        </div>
    );
    
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Estado, comparisonFn);