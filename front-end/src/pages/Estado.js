import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { EstadoService } from '../service/EstadoService';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

const Estado = () => {

    let objetoNovo = {
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

    const [objeto, setObjeto] = useState(objetoNovo);
    const [estadoDialog, setEstadoDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        if(objetos == null) {
            objetoService.listarTodos().then(res => {
                setObjetos(res.data)
            })
        }
    }, [objetos])

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    {/* <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
                </div>
            </React.Fragment>
        )
    }

    const openNew = () => {
        setObjeto(objetoNovo);
        setSubmitted(false);
        setEstadoDialog(true);
    }

    const regioes = [
        {name: 'Centro-Oeste', code: 'Centro-Oeste'},
        {name: 'Nordeste', code: 'Nordeste'},
        {name: 'Norte', code: 'Norte'},
        {name: 'Sudeste', code: 'Sudeste'},
        {name: 'Sul', code: 'Sul'},
    ];

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

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _objeto = { ...objeto };
        _objeto[`${name}`] = val;

        setObjeto(_objeto);
    }

    const hideDialog = () => {
        setSubmitted(false)
        setEstadoDialog(false);
    }

    const editObjeto = (objeto) => {
        setObjeto({ ...objeto });
        setEstadoDialog(true);
    }

    const actionBodyTemplate = (rowData) => {
            return (
                <div className="actions">
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editObjeto(rowData)} />
                    
                </div>
            );
        }

    const saveProduct = () => {
        setSubmitted(true)
        let _objeto = { ...objeto }
        
        if(_objeto.nome.trim()) {
            if(_objeto.id) {
                objetoService.alterar(_objeto).then(data => {
                    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Alterado com Sucesso', life: 3000 });
                    setObjetos(null);
                });
            } else {
                objetoService.inserir(_objeto).then(data => {
                    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Inserido com Sucesso', life: 3000 });
                    setObjetos(null);
                })
                .catch((error) => {   
                    toast.current.show({
                        severity: 'error',
                        summary: 'Erro',
                        detail: `Erro ao inserir: ${error.response.data}`,
                        life: 3000,
                    });
                });
            }

            setEstadoDialog(false);
            setObjeto(objetoNovo);
        }
    }

    const objetoDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );

    

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">                        
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>

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
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>  
                    

                    <Dialog visible={estadoDialog} style={{ width: '450px' }} header="Detalhes do Estado" modal className="p-fluid" footer={objetoDialogFooter}>                       
                       

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="nome">Nome</label>
                                <InputText id="nome" value={objeto.nome} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className={classNames({ 'p-invalid': submitted && !objeto.nome })} />
                                {submitted && !objeto.nome && <small className="p-invalid">Nome é obrigatório.</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="capital">Capital</label>
                                <InputText id="capital" value={objeto.capital} onChange={(e) => onInputChange(e, 'capital')} required className={classNames({ 'p-invalid': submitted && !objeto.capital })} />
                                {submitted && !objeto.capital && <small className="p-invalid">Capital é obrigatório.</small>}
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="regiao">Região</label>
                                <InputText id="regiao" value={objeto.regiao} onChange={(e) => onInputChange(e, 'regiao')} required className={classNames({ 'p-invalid': submitted && !objeto.regiao })} />
                                {submitted && !objeto.regiao && <small className="p-invalid">Região é obrigatório.</small>}
                            </div>                            

                            <div className="field col">
                                <label htmlFor="sigla">Sigla</label>
                                <InputText id="sigla" value={objeto.sigla} onChange={(e) => onInputChange(e, 'sigla')} required className={classNames({ 'p-invalid': submitted && !objeto.sigla })} />
                                {submitted && !objeto.sigla && <small className="p-invalid">Sigla é obrigatório.</small>}
                            </div>
                        </div>
                    </Dialog>
                    
                </div>
            </div>
        </div>
    );    
    
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Estado, comparisonFn);