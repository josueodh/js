import React, { useState, useEffect, FormEvent } from "react";
import { FiChevronRight } from "react-icons/fi";
import api from "../../services/api";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { Title, Form, Repositories, Error } from "./styles";
interface Repository {
  description: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}
const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState("");
  const [inputError, setInputError] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      "@GithubExplorer:repositories"
    );
    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    return [];
  });
  useEffect(() => {
    localStorage.setItem(
      "@GithubExplorer:repositories",
      JSON.stringify(repositories)
    );
  }, [repositories]);
  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    if (!newRepo) {
      setInputError("Digite o autor/nome do repositório");
      return;
    }
    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);
      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo("");
      setInputError("");
    } catch (err) {
      setInputError("Erro na busca por esse repositório");
    }
  }
  return (
    <>
      <img src={logo} alt="Github Explorer" />
      <Title>Explore repositórios no GitHub.</Title>
      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          placeholder="Digite o repositório aqui"
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {repositories.map((repository) => (
          <Link
            to={`/repositories/${repository.full_name}`}
            key={repository.full_name}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;