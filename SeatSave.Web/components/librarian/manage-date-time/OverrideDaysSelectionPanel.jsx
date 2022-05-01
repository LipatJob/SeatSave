import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { formatDate } from '../../../lib/DateHelper';
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

  async function getSpecificDays() {
    const response = await fetch(
      `${process.env.API_URL}/Api/Availability/SpecificDay`,
      {
        method: 'GET',
      },
    );
    const data = await response.json();
    return data;
  }

  async function updateOverrideDays() {
    const days = await getSpecificDays();
    setOverrideDayItems(days);
  }

  async function deleteDayOverride(date) {
    const response = await fetch(
      `${process.env.API_URL}/Api/Availability/SpecificDay/${date}`,
      {
        method: 'DELETE',
      },
    );
    const data = await response.json();
    console.log(data);
    return data;
  }

  async function addDayOverride(date) {
    const response = await fetch(
      `${process.env.API_URL}/Api/Availability/SpecificDay`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: `"${date}"`,
      },
    );
    const data = await response.json();
    console.log(data);
    return data;
  }

  useEffect(() => {
    updateOverrideDays();
  }, []);

  const [toDelete, setToDelete] = useState(-1);
  const onDeleteClicked = (id) => {
    setConfirmationModalVisible(true);
    setToDelete(id);
  };

  const onDeleteConfirmed = async (id) => {
    await deleteDayOverride(id);
    setConfirmationModalVisible(false);
    updateOverrideDays();
    onItemSelected(null);
  };

  const onAddDate = async (date) => {
    await addDayOverride(date);
    updateOverrideDays();
    setAddDateModalVisible(false);
  };

  const isDayUnique = (date) => !overrideDayItems.includes(date);

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
              <p>{formatDate(e)}</p>
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
          onAdd={onAddDate}
          onClose={() => setAddDateModalVisible(false)}
          isDayUnique={isDayUnique}
        />
      )}
    </div>
  );
}
