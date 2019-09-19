import React, { useEffect, useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';

import { Container, Form, Input, H1, TextArea } from './styles';

export default function Settings() {
  const [roles, setRoles] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [form, setForm] = useState({
    name: '',
    nickname: '',
    email: '',
    bio: '',
    urls: [''],
    skills: [],
  });

  useEffect(() => {
    async function getNotifications() {
      const { data } = await api.get('/v1/roles');

      setRoles(data);
    }

    getNotifications();
  }, []);

  useEffect(() => {
    async function getNotifications() {
      const { data } = await api.get('/v1/roles');

      setRoles(data);
    }

    getNotifications();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { name, bio, nickname, email, urls, skills } = form;
      const obj = {};

      if (name) obj.name = name;
      if (bio) obj.bio = bio;
      if (nickname) obj.nickname = nickname;
      if (email) obj.email = email;
      if (urls[0].length > 1) obj.urls = urls;
      if (skills.length > 1) obj.roles = skills;

      await api.put(`/v1/users`, obj);

      toast('Profile updated!', {
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

  function onChangeSkills(skill) {
    if (form.skills.includes(skill)) {
      form.skills = form.skills.filter(item => item !== skill);
    } else {
      form.skills.push(skill);
    }

    setForm({ ...form, skills: form.skills });
  }

  function addUrlField() {
    setForm({ ...form, urls: [...form.urls, ''] });
  }

  function removeUrlField(index) {
    form.urls.splice(index, 1);

    setForm({ ...form, urls: [...form.urls] });
  }

  async function onChangeUrl(e, index) {
    form.urls[index] = e.target.value;

    setForm({ ...form, urls: form.urls });
  }

  async function onFileChange(file) {
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const { data } = await api.post(`/v1/files/users`, formData, config);

    setAvatar(data.url);
  }

  return (
    <Container>
      <H1> Edite your profile </H1>

      <img src={avatar} alt="user" style={{ maxWidth: 200, maxHeight: 200 }} />
      <Form onSubmit={handleSubmit}>
        <label htmlFor="file" style={{ marginTop: 20, textAlign: 'left' }}>
          Avatar:{' '}
        </label>
        <input type="file" onChange={e => onFileChange(e.target.files[0])} />

        <label htmlFor="name" style={{ marginTop: 20, textAlign: 'left' }}>
          {' '}
          Name:
        </label>
        <Input
          name="name"
          id="name"
          placeholder=" Your name here!"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <label htmlFor="nickname" style={{ marginTop: 20, textAlign: 'left' }}>
          {' '}
          Nickname:
        </label>
        <Input
          id="nickname"
          name="nickname"
          placeholder=" Nickname"
          onChange={e => setForm({ ...form, nickname: e.target.value })}
        />

        <label htmlFor="email" style={{ marginTop: 20, textAlign: 'left' }}>
          {' '}
          Email:
        </label>
        <Input
          name="email"
          type="email"
          id="email"
          placeholder=" E-Mail here!"
          err
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <label htmlFor="bio" style={{ marginTop: 20, textAlign: 'left' }}>
          {' '}
          Bio:
        </label>
        <TextArea
          id="bio"
          name="bio"
          maxLength="255"
          placeholder=" Tell me about you! I want to know..."
          rows="5"
          onChange={e => setForm({ ...form, bio: e.target.value })}
        />

        <h4>Useful urls</h4>
        <small>Github link, linkedin or personal website</small>
        <div className="urls">
          <div className="url_box">
            {form.urls.map((url, index) => (
              <div key={index} className="inner_input">
                <Input
                  placeholder="Some useful links here"
                  value={url}
                  onChange={e => onChangeUrl(e, index)}
                />

                {form.urls.length > 1 ? (
                  <button
                    className="btn btn_remove"
                    type="button"
                    onClick={() => removeUrlField(index)}
                  >
                    <FaTimes />
                  </button>
                ) : null}
              </div>
            ))}
          </div>

          <button className="btn btn_add" type="button" onClick={addUrlField}>
            <FaPlus />
          </button>
        </div>

        <h4>Select Roles</h4>
        <div className="roles">
          {roles.map(role => (
            <label key={role.id} htmlFor={`${role.name}`}>
              <input
                className="checkbox"
                type="checkbox"
                name={role.name}
                value={role.id}
                onChange={e => onChangeSkills(e.target.value)}
              />
              <span className="checkmark" />
              {role.name}
            </label>
          ))}
        </div>

        <button className="btn" type="submit">
          Send
        </button>
      </Form>
      <ToastContainer />
    </Container>
  );
}
