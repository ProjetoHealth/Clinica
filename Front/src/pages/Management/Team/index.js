import React, { useEffect, useState } from 'react';
import { store } from 'react-notifications-component';
import Title from '../../../components/Management/Title';
import Tables from '../../../components/Table';
import api from '../../../services/api';


function Team(){
  const [colabs, setColabs] = useState({
    data: [],
    reload: true
  })
  const columns = [
    { title: 'Criado em', field: 'create_date', editable: 'never'},
    { title: 'Nome', field: 'name', editable: 'onAdd' },
    { title: 'E-mail', field: 'email', editable: 'onAdd' },
    { title: 'RA', field: 'identity', editable: 'onAdd'},
    { title: 'Tipo', 
      field: 'type', 
      lookup: {
        'admin': 'Administrador(a)', 
        'teacher': 'Professor(a)',
        'employee': 'Colaborador(a)'
      },
      editable: 'onAdd'
    },
    { title: 'Clínica', 
      field: 'clinic_id', 
      lookup: {
        'null':'Não se aplica',
        1: 'Medicina', 
        2: 'Odontologia',
        3: 'Fisioterapia',
        4: 'Nutrição',
        5: 'Psicologia'
      },
      editable: 'onAdd'
    },
  ]
  useEffect(() => {
    const getClasses = async() => {
      if(colabs.reload){
        try {
          api.get('/colabs/all').then((response) => {
            setColabs({
              data: response.data,
              reload: false
            })
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
    getClasses()
  });

  const handleUpdate = async(data) => {
    try {
      await api.put('/colabs/update', data).then(() => {
        store.addNotification({
          title: 'Sucesso',
          message: 'Dados atualizados com sucesso.',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
      })
      setTimeout(function(){ window.location.reload(); }, 2000);
    } catch (error) {
      console.log(error)
    }
  }  

  const handleDelete = async(data) => {
    try {
      await api.delete('/colabs/update', {
        params: {
          data: data
        }
      }).then((response) => {
        store.addNotification({
          title: 'Sucesso',
          message: 'Usuário removido com sucesso.',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animated', 'fadeIn'],
          animationOut: ['animated', 'fadeOut'],
          dismiss: {
            duration: 2000,
            onScreen: true,
          },
        });
      })
      setTimeout(function(){ window.location.reload(); }, 2000);
    } catch (error) {
      console.log(error)
    }
  }

  const handleAdd = async(data) => {
    try {
      await api.post('/colabs/add', data).then((response) => {
        if(response.data.response){
          store.addNotification({
              title: 'Sucesso',
              message: response.data.message,
              type: 'success',
              insert: 'top',
              container: 'top-right',
              animationIn: ['animated', 'fadeIn'],
              animationOut: ['animated', 'fadeOut'],
              dismiss: {
                duration: 2000,
                onScreen: true,
              },
            });
          setTimeout(function(){ window.location.reload(); }, 2000);
        } else {
          store.addNotification({
            title: 'Error',
            message: response.data.message,
            type: 'success',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animated', 'fadeIn'],
            animationOut: ['animated', 'fadeOut'],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <>
      <Title 
        label={'Colaboradores'}
      />
      <div>
        <Tables 
          title={''}
          columns={columns}
          data={colabs.data}
          options={{ actionsColumnIndex: -1 }}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve) => {
                handleAdd(newData)
                resolve();
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                handleUpdate(newData)
                resolve();
              }),
            onRowDelete: oldData => 
              new Promise((resolve) => {
                handleDelete(oldData)
                resolve()
              })
          }}
        />
      </div>
    </>
  )
}
export default Team;