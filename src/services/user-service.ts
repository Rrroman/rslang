import { authErrorPath } from '../utils/constants';

export default class UserService {
  langUrl = 'https://rslang-app.herokuapp.com/';

  async createUser(user: {
    email: string;
    name: string;
    password: string;
    foto64: string;
  }) {
    try {
      const rawResponse = await fetch(`${this.langUrl}users`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (rawResponse.status === 417) {
        const data = {
          error: {
            errors: [
              {
                path: authErrorPath.email,
                message: 'почта уже зарегистрирована',
              },
            ],
          },
        };
        return data;
      }
      const content = await rawResponse.json();
      return content;
    } catch (err) {
      alert('Проблемы с доступом к серверу попробуйте позже');
      return null;
    }
  }

  async loginUser(user: { email: string; password: string }) {
    const rawResponse = await fetch(`${this.langUrl}signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (rawResponse.status === 404) {
      return { error: { message: 'Пользователь не найден', path: 'email' } };
    }

    if (rawResponse.status === 403) {
      return { error: { message: 'Пароль не верный', path: 'password' } };
    }

    const content = await rawResponse.json();
    return content;
  }

  updateUser = async (params: {
    userId: string;
    token: string;
    body: {
      foto64?: string;
      level?: string;
    };
  }) => {
    const rawResponse = await fetch(`${this.langUrl}users/${params.userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${params.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params.body),
    });
    const content = await rawResponse.json();
    return content;
  };
}
