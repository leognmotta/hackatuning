import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { parseISO } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';

import DefaultCover from '../../assets/default_cover.jpg';
import { Form, Input, TextArea, Button } from '../../components/Form';
import { Container } from './styles';

export default function UpdateHackathon({ match }) {
  const [cover, setCover] = useState();
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    location: '',
    online: false,
    event_date: new Date(),
    deadline_subscription: new Date(),
    event_ending: new Date(),
    deadline_team_creation: new Date(),
    awards: '',
    min_participants: 1,
    max_participants: 9999,
  });

  useEffect(() => {
    async function loadHackathon() {
      const { id } = match.params;

      const { data } = await api.get(`/v1/hackathons/${id}`);

      if (data.cover) {
        setCover(data.cover.url);
      }

      setForm({
        title: data.title,
        subtitle: data.subtitle,
        online: data.online,
        location: data.location,
        description: data.description,
        awards: data.awards,
        min_participants: data.min_participants,
        max_participants: data.max_participants,
        event_date: parseISO(data.event_date),
        deadline_subscription: parseISO(data.deadline_subscription),
        deadline_team_creation: parseISO(data.deadline_team_creation),
        event_ending: parseISO(data.event_ending),
      });
    }

    loadHackathon();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const { id } = match.params;

    const obj = { ...form };

    if (form.online) obj.location = 'online';

    try {
      await api.put(`/v1/hackathons/${id}`, obj);

      toast('Hackathon successfully updated!', {
        className: 'toast-background_success',
        bodyClassName: 'toast-font-size',
        progressClassName: 'toast-progress-bar_success',
      });
    } catch (error) {
      toast(
        error.response.data.fields
          ? error.response.data.fields[0].message
          : error.response.data.message,
        {
          className: 'toast-background',
          bodyClassName: 'toast-font-size',
          progressClassName: 'toast-progress-bar',
        }
      );
    }
  }

  async function handleFileChange(e) {
    try {
      const { id } = match.params;
      const formData = new FormData();

      const file = e.target.files[0];

      formData.append('file', file);

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      e.target.value = '';

      const { data } = await api.post(
        `/v1/files/hackathons/${id}`,
        formData,
        config
      );

      if (data.url) {
        toast('Avatar successfully changed!', {
          className: 'toast-background_success',
          bodyClassName: 'toast-font-size',
          progressClassName: 'toast-progress-bar_success',
        });
      } else {
        toast('There was an error uploading the cover!', {
          className: 'toast-background',
          bodyClassName: 'toast-font-size',
          progressClassName: 'toast-progress-bar',
        });
      }

      setCover(data.url);
    } catch (error) {
      toast(
        error.response.data.fields
          ? error.response.data.fields[0].message
          : error.response.data.message,
        {
          className: 'toast-background',
          bodyClassName: 'toast-font-size',
          progressClassName: 'toast-progress-bar',
        }
      );
    }
  }

  return (
    <Container>
      <h1>Update Hackathon</h1>

      <Form onSubmit={handleSubmit}>
        <img src={cover || DefaultCover} alt={`${form.title}cover`} />

        <label htmlFor="file">
          <input id="file" type="file" onChange={e => handleFileChange(e)} />
        </label>

        <Input
          label="Title:"
          onChange={e => setForm({ ...form, title: e.target.value })}
          value={form.title}
        />

        <Input
          label="Subtitle:"
          onChange={e => setForm({ ...form, subtitle: e.target.value })}
          value={form.subtitle}
        />

        <label htmlFor="checkbox">
          Is the event online?
          <input
            checked={form.online}
            id="checkbox"
            type="checkbox"
            value={form.online}
            onChange={() => setForm({ ...form, online: !form.online })}
          />
        </label>

        {!form.online ? (
          <Input
            label="Location:"
            onChange={e => setForm({ ...form, location: e.target.value })}
            value={form.location}
          />
        ) : null}

        <TextArea
          label="Description:"
          onChange={e => setForm({ ...form, description: e.target.value })}
          value={form.description}
        />

        <TextArea
          label="Awards:"
          onChange={e => setForm({ ...form, awards: e.target.value })}
          value={form.awards}
        />

        <Input
          label="Min participants:"
          type="number"
          onChange={e => setForm({ ...form, min_participants: e.target.value })}
          value={form.min_participants}
        />

        <Input
          label="Max participants:"
          type="number"
          onChange={e => setForm({ ...form, max_participants: e.target.value })}
          value={form.max_participants}
        />

        <label htmlFor="event_date">
          Date:
          <DatePicker
            id="event_date"
            selected={form.event_date}
            value={form.event_date}
            showTimeInput
            onClickOutside
            shouldCloseOnSelect
            time
            onChange={date => setForm({ ...form, event_date: new Date(date) })}
          />
        </label>

        <label htmlFor="deadline_subscription">
          End subscription date:
          <DatePicker
            id="deadline_subscription"
            selected={form.deadline_subscription}
            value={form.deadline_subscription}
            showTimeInput
            onClickOutside
            shouldCloseOnSelect
            time
            onChange={date =>
              setForm({ ...form, deadline_subscription: new Date(date) })
            }
          />
        </label>

        <label htmlFor="deadline_team_creation">
          End team creation date:
          <DatePicker
            id="deadline_team_creation"
            selected={form.deadline_team_creation}
            value={form.deadline_team_creation}
            showTimeInput
            onClickOutside
            shouldCloseOnSelect
            time
            onChange={date =>
              setForm({ ...form, deadline_team_creation: new Date(date) })
            }
          />
        </label>

        <label htmlFor="event_ending">
          End event date:
          <DatePicker
            id="event_ending"
            selected={form.event_ending}
            value={form.event_ending}
            showTimeInput
            onClickOutside
            shouldCloseOnSelect
            time
            onChange={date =>
              setForm({ ...form, event_ending: new Date(date) })
            }
          />
        </label>
        <Button text="Send" />
      </Form>

      <ToastContainer />
    </Container>
  );
}
