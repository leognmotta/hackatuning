import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';

import LogoIcon from '../../assets/Logo@icon.svg';
import { Container, Form, Input, H1, TextArea } from './styles';

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
    async function loadRoles() {
      const { data } = await api.get('/v1/roles');

      setRoles(data);
    }

    loadRoles();
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

      toast(
        'Your registration has been successfully completed, now just sign in!',
        {
          className: 'toast-background-success',
          bodyClassName: 'toast-font-size',
          progressClassName: 'toast-progress-bar-success',
        }
      );

      setTimeout(() => {
        history.push('/login');
      }, 3500);
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

  return (
    <Container>
      <img src={LogoIcon} alt="Logo" />
      <H1> Register </H1>
      <small className="subTitle">Create an account to use our services.</small>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="name" className="label">
          {' '}
          Name:
        </label>
        <Input
          name="name"
          id="name"
          placeholder=" Your name here!"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <label htmlFor="nickname" className="label">
          {' '}
          Nickname:
        </label>
        <Input
          id="nickname"
          name="nickname"
          placeholder=" Nickname"
          onChange={e => setForm({ ...form, nickname: e.target.value })}
        />

        <label htmlFor="email" className="label">
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

        <label htmlFor="password" className="label">
          {' '}
          Password:
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder=" Super secret pass plss"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <label htmlFor="bio" className="label">
          {' '}
          Bio:
        </label>
        <TextArea
          id="bio"
          name="bio"
          placeholder=" Tell me about you! I want to know..."
          rows="5"
          onChange={e => setForm({ ...form, bio: e.target.value })}
        />

        <h4 className="label">Useful urls:</h4>
        <small>Github link, linkedin or personal website</small>
        <div className="urls">
          <div className="url_box">
            {form.urls.map((url, index) => (
              <div key={url} className="inner_input">
                <Input
                  key={index}
                  placeholder="Some useful links here"
                  value={url}
                  onChange={e => onChangeUrl(e, index)}
                  style={{ marginBottom: '10px' }}
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

        <h4 className="label">Select Roles:</h4>
        <div className="roles">
          {roles.map(role => (
            <label key={role.id} htmlFor={`roles${role.name}`}>
              <input
                id={`roles${role.name}`}
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
          Register
        </button>

        <span className="or">OR</span>

        <Link className="link" to="/login">
          Login with existing account!
        </Link>
      </Form>
      <ToastContainer />
    </Container>
  );
}
