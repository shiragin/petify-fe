import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { usePetsContext } from '../../context/PetsContext';
// import PetEditModal from './PetEditModal';
import PetLine from './PetLine';

function PetList() {
  const { getPets, pets, petEditModalShow, setPetEditModalShow } =
    usePetsContext();

  useEffect(() => {
    getPets();
  }, []);

  return (
    <Table borderless hover className="show-pets-list">
      {/* <PetEditModal
        show={petEditModalShow}
        onHide={() => setPetEditModalShow(false)}
      /> */}
      <thead>
        <tr className="show-pets-list-line-heading">
          <th>Name</th>
          <th>Type</th>
          <th>Breed</th>
          {/* <th colSpan={2}>Status</th> */}
          <th>Status</th>
          <th>View</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {pets
          .sort((pet1, pet2) => (pet1.name > pet2.name ? 1 : -1))
          .map(({ _id, name, type, breed, adoptionStatus, picture }) => (
            <PetLine
              key={_id}
              value={{ name, type, breed, adoptionStatus }}
              id={_id}
            />
          ))}
      </tbody>
    </Table>
  );
}

export default PetList;
