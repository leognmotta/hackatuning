import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../services/api';
import { Form, Input, TextArea, Button } from '../../components/Form/index';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from './styles';

export default function RegisterHackathon({ history }) {
  const [file, setFile] = useState();
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

  async function handleSubmit(e) {
    e.preventDefault();
    let formData;
    let config = {};

    if (form.online) form.location = 'online';
    setForm(form);

    if (file) {
      formData = new FormData();
      formData.append('file', file);
      config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
    }

    try {
      const { data } = await api.post('/v1/hackathons', form);

      if (formData)
        await api.post(`/v1/files/hackathons/${data.id}`, formData, config);

      toast('Hackathon created!', {
        className: 'toast-background-success',
        bodyClassName: 'toast-font-size',
        progressClassName: 'toast-progress-bar-success',
      });

      setTimeout(() => {
        history.push('/hackathons');
      }, 2000);
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
      <h1 style={{ textAlign: 'center' }}>Register Hackathon</h1>

      <Form onSubmit={handleSubmit}>
        <p className="label" style={{ marginTop: '20px' }}>
          Cover:
        </p>

        <input
          className="file"
          id="cover"
          type="file"
          onChange={e => setFile(e.target.files[0])}
        />

        <Input
          label="Title:"
          type="text"
          value={form.title}
          placeholder="Title:"
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <Input
          label="Subtitle:"
          type="text"
          placeholder="Subtitle:"
          value={form.subtitle}
          onChange={e => setForm({ ...form, subtitle: e.target.value })}
        />

        <TextArea
          label="Description:"
          value={form.description}
          placeholder="Description:"
          rows="7"
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <label
          htmlFor="checkbox"
          className="label"
          style={{ marginBottom: '10px' }}
        >
          Is the event online?
          <input
            id="checkbox"
            type="checkbox"
            value={form.online}
            style={{ marginLeft: '10px' }}
            onChange={() => setForm({ ...form, online: !form.online })}
          />
        </label>

        {form.online ? null : (
          <Input
            label="Location:"
            type="text"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
          />
        )}

        <Input
          label="Min Participants:"
          type="number"
          value={form.min_participants}
          style={{ width: 100, marginLeft: 11 }}
          placeholder="Min:"
          onChange={e => setForm({ ...form, min_participants: e.target.value })}
        />

        <Input
          label="Max Participants:"
          type="number"
          placeholder="Max:"
          value={form.max_participants}
          style={{ width: 100, marginLeft: 10 }}
          onChange={e => setForm({ ...form, max_participants: e.target.value })}
        />

        <TextArea
          label="Awards:"
          placeholder="Awards:"
          rows="4"
          value={form.awards}
          onChange={e => setForm({ ...form, awards: e.target.value })}
        />

        <p className="label">Event beginning:</p>
        <DatePicker
          className="input"
          id="event_date"
          selected={form.event_date}
          value={form.event_date}
          showTimeInput
          onClickOutside
          shouldCloseOnSelect
          time
          onChange={date => setForm({ ...form, event_date: new Date(date) })}
        />

        <p className="label">Event ending:</p>
        <DatePicker
          className="input"
          id="event_ending"
          selected={form.event_ending}
          value={form.event_ending}
          showTimeInput
          onClickOutside
          shouldCloseOnSelect
          time
          onChange={date => setForm({ ...form, event_ending: new Date(date) })}
        />

        <p className="label">End subscription date:</p>
        <DatePicker
          className="input"
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

        <p className="label">End team creation date:</p>
        <DatePicker
          className="input"
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

        <Button text="Send" type="submit" />
      </Form>

      <ToastContainer />
    </Container>
  );
}
