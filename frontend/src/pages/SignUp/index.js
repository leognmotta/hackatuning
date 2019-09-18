import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';

import { Container, Form, Input, H1 } from './styles';

export default function SignUp({ history }) {
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({
    name: '',
    nickname: '',
    email: '',
    password: '',
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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post('/v1/users', {
        name: form.name,
        bio: form.bio,
        nickname: form.nickname,
        email: form.email,
        password: form.password,
        urls: form.urls,
        roles: form.skills,
      });

      history.push('/login');
    } catch (error) {
      toast(
        error.response.data.fields
          ? error.response.data.fields[0]
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

  return (
    <Container>
      <H1> Register </H1>
      <Form onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder=" Your name here!"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <Input
          name="nickname"
          placeholder=" Nickname"
          onChange={e => setForm({ ...form, nickname: e.target.value })}
        />
        <Input
          name="email"
          type="email"
          placeholder=" E-Mail here!"
          err
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <Input
          name="password"
          type="password"
          placeholder=" Super secret pass plss"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <Input
          name="bio"
          maxLength="255"
          placeholder=" Tell me about you! I want to know..."
          multiline
          onChange={e => setForm({ ...form, bio: e.target.value })}
        />

        <h2>Usefull urls</h2>
        <small>Github link, linkedin or personal website</small>
        <div className="urls">
          <div className="url_box">
            {form.urls.map((url, index) => (
              <div className="inner_input">
                <Input
                  key={index}
                  placeholder="Some useful links here"
                  value={url}
                  onChange={e => onChangeUrl(e, index)}
                />

                <button
                  className="btn btn_remove"
                  type="button"
                  onClick={() => removeUrlField(index)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>

          <button className="btn btn_add" type="button" onClick={addUrlField}>
            <FaPlus />
          </button>
        </div>

        <h2>Select Roles</h2>
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

        <span className="or">OR</span>

        <Link to="/login">Login with existing account!</Link>
      </Form>
      <ToastContainer />
    </Container>
  );
}
