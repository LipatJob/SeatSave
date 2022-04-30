import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import CircularButton from '../../common/CircularButton';
import DeleteConfirmationModal from '../../common/DeleteConfirmationModal';
import AddSpecifcDayModal from './AddSpecificDayModal';
import PanelListItem from './PanelListItem';

export default function OverrideDaysSelectionPanel({
  onItemSelected,
  selectedId,
}) {
  const [overrideDayItems, setOverrideDayItems] = useState(['2022-01-01']);

  const [confirmDeleteModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [addDateModalVisible, setAddDateModalVisible] = useState(false);

  const [toDelete, setToDelete] = useState(-1);
  const onDeleteClicked = (id) => {
    setConfirmationModalVisible(true);
    setToDelete(id);
  };
  const onDeleteConfirmed = (id) => {
    console.log(`Deleting ${id}`);
    setConfirmationModalVisible(false);
  };

  const onAddDate = (date) => {};

  return (
    <div className='relative h-full'>
      <div className='flex flex-col gap-2 p-3 pt-5'>
        {overrideDayItems.map((e) => (
          <PanelListItem
            onClick={() => onItemSelected(e)}
            key={e}
            selected={selectedId === e}
          >
            <div className='flex items-center'>
              <p>{e}</p>
              <button
                type='button'
                className='ml-auto text-valentine-red active:bg-black'
                onClick={() => onDeleteClicked(e)}
              >
                <AiOutlineCloseCircle className='w-8 h-8 ' />
              </button>
            </div>
          </PanelListItem>
        ))}
      </div>
      <div className='absolute bottom-3 right-3'>
        <CircularButton onClick={() => setAddDateModalVisible(true)} />
      </div>
      {confirmDeleteModalVisible && (
        <DeleteConfirmationModal
          text='Are you sure you want to delete this day?'
          onYes={() => onDeleteConfirmed(toDelete)}
          onNo={() => setConfirmationModalVisible(false)}
          onClose={() => setConfirmationModalVisible(false)}
        />
      )}

      {addDateModalVisible && (
        <AddSpecifcDayModal
          text='Are you sure you want to delete this day?'
          onYes={onAddDate}
          onNo={() => setAddDateModalVisible(false)}
          onClose={() => setAddDateModalVisible(false)}
        />
      )}
    </div>
  );
}
