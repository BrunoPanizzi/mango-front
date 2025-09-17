import React, { useState, useMemo } from "react";
import {
  Search,
  Users,
} from "lucide-react";

import TurmaCard from "./TurmaCard";

import "./listaAluno.css";
import { useTurmas } from "../../hooks/useTurmas";

const ListaAlunos = () => {
  const [filtro, setFiltro] = useState("");

  const { turmas, hasError, isLoading } = useTurmas({ withAlunos: true });

  // Dados mockados das turmas e alunos
  //  const turmas = [
  //    {
  //      id: 1,
  //      nome: "1º ANO A",
  //      turno: "manha",
  //      capacidade: 30,
  //      alunos: [
  //        { id: 1, nome: "Ana Silva", status: "ativo" },
  //        { id: 2, nome: "Bruno Costa", status: "ativo" },
  //        { id: 3, nome: "Carlos Mendes", status: "inativo" },
  //        { id: 4, nome: "Diana Oliveira", status: "ativo" },
  //        { id: 5, nome: "Eduardo Santos", status: "ativo" },
  //      ],
  //    },
  //    {
  //      id: 2,
  //      nome: "2º ANO A",
  //      turno: "manha",
  //      capacidade: 25,
  //      alunos: [
  //        { id: 6, nome: "Fernanda Lima", status: "ativo" },
  //        { id: 7, nome: "Gabriel Rocha", status: "ativo" },
  //        { id: 8, nome: "Helena Cardoso", status: "inativo" },
  //        { id: 9, nome: "Igor Ferreira", status: "ativo" },
  //      ],
  //    },
  //    {
  //      id: 3,
  //      nome: "2º ANO B",
  //      turno: "tarde",
  //      capacidade: 20,
  //      alunos: [
  //        { id: 10, nome: "Julia Alves", status: "ativo" },
  //        { id: 11, nome: "Lucas Barbosa", status: "ativo" },
  //        { id: 12, nome: "Maria João", status: "ativo" },
  //        { id: 13, nome: "Nicolas Pereira", status: "inativo" },
  //        { id: 14, nome: "Olga Nascimento", status: "ativo" },
  //        { id: 15, nome: "Paulo Dias", status: "ativo" },
  //      ],
  //    },
  //    {
  //      id: 4,
  //      nome: "3º ANO A",
  //      turno: "manha",
  //      capacidade: 28,
  //      alunos: [
  //        { id: 16, nome: "Queila Monteiro", status: "ativo" },
  //        { id: 17, nome: "Rafael Torres", status: "ativo" },
  //        { id: 18, nome: "Sofia Campos", status: "ativo" },
  //      ],
  //    },
  //  ];

  // Filtrar turmas baseado no termo de busca
  const turmasFiltradas = useMemo(() => {
    if (!filtro) return turmas;

    return turmas
      .filter((turma) => {
        // Filtrar por nome da turma
        const turmaNomeMatch = turma.nome
          .toLowerCase()
          .includes(filtro.toLowerCase());

        // Filtrar por nome dos alunos
        const alunoNomeMatch = turma.alunos.some((aluno) =>
          aluno.nome.toLowerCase().includes(filtro.toLowerCase())
        );

        return turmaNomeMatch || alunoNomeMatch;
      })
      .map((turma) => ({
        ...turma,
        alunos: turma.alunos.filter(
          (aluno) =>
            !filtro ||
            turma.nome.toLowerCase().includes(filtro.toLowerCase()) ||
            aluno.nome.toLowerCase().includes(filtro.toLowerCase())
        ),
      }));
  }, [filtro, turmas]);

  return (
    <div className="cadastro-turma-form-container">
      {/* Seção de Filtros */}
      <div className="cadastro-turma-form-section">
        <div className="cadastro-turma-section-header">
          <span>Filtros de Busca</span>
        </div>
        <div className="cadastro-turma-form-grid">
          <div className="cadastro-turma-form-group full-width">
            <label>Buscar por turma ou aluno</label>
            <div className="cadastro-turma-input-wrapper">
              <Search className="cadastro-turma-input-icon-aluno" size={18} />
              <input
                type="text"
                className="cadastro-turma-input search-input-lista-aluno"
                placeholder="Digite o nome da turma ou do aluno..."
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Turmas */}
      <div className="cadastro-turma-form-section">
        <div className="cadastro-turma-section-header">
          <span>Turmas Cadastradas</span>
          <span
            style={{ fontSize: "14px", color: "#64748b", fontWeight: "normal" }}
          >
            {turmasFiltradas.length} turma
            {turmasFiltradas.length !== 1 ? "s" : ""} encontrada
            {turmasFiltradas.length !== 1 ? "s" : ""}
          </span>
        </div>

        {turmasFiltradas.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Users size={40} />
            </div>
            <h4>Nenhuma turma encontrada</h4>
            <p>
              Tente ajustar os filtros de busca ou verifique se há turmas
              cadastradas.
            </p>
          </div>
        ) : (
          <div className="turmas-list-alunos">
            {turmasFiltradas.map((turma) => (
              <TurmaCard key={turma.id} turma={turma} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListaAlunos;
