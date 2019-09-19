import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import api from '../../services/api';
import { Form, Input, TextArea, Button } from '../../components/Form/index';
import 'react-datepicker/dist/react-datepicker.css';

import { Container } from './styles';

export default function RegisterHackathon() {
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

      console.log(data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <Container>
      <h1>Rregister Hackathon</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="cover">
          Cover image:
          <input
            id="cover"
            type="file"
            onChange={e => setFile(e.target.files[0])}
          />
        </label>

        <Input
          label="Title:"
          type="text"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <Input
          label="Subtitle:"
          type="text"
          value={form.subtitle}
          onChange={e => setForm({ ...form, subtitle: e.target.value })}
        />

        <TextArea
          label="Description:"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <label htmlFor="checkbox">
          Is the event online?
          <input
            id="checkbox"
            type="checkbox"
            value={form.online}
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
          onChange={e => setForm({ ...form, min_participants: e.target.value })}
        />

        <Input
          label="Max Participants:"
          type="number"
          value={form.max_participants}
          style={{ width: 100, marginLeft: 10 }}
          onChange={e => setForm({ ...form, max_participants: e.target.value })}
        />

        <TextArea
          label="Awards:"
          value={form.awards}
          onChange={e => setForm({ ...form, awards: e.target.value })}
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

        <Button text="Send" type="submit" />
      </Form>
    </Container>
  );
}
