# 🛒 CRUD de Produtos – Projeto Full Stack
**Disciplina:** Desenvolvimento de Software em Nuvem  
**Professor:** Américo Sampaio  
**Curso:** Análise e Desenvolvimento de Sistemas (2º semestre) – UNIFOR  
**Alunos:** *Estenio Gabriel - Paulo Zek*

---

## 📘 Sobre o Projeto
Este projeto consiste no desenvolvimento de uma aplicação **Full Stack** realizando um **CRUD de produtos**, com backend em API REST e banco de dados hospedado no **Supabase**, conforme o escopo definido pelo professor.

O objetivo é demonstrar habilidades práticas de desenvolvimento web, deploy em nuvem, integração com banco de dados e melhorias no frontend.

---

## 🎯 Requisitos do Trabalho

### ✔️ 1. Banco de Dados
- Banco criado no **Supabase**
- Tabela de produtos contendo:
    - `id` (int, PK)
    - `name` (text)
    - `price` (numeric)
    - `description` (text)

---

## 🖥️ Backend (API REST)
O backend foi implementado utilizando **Node.js + Express**, hospedado em uma máquina virtual na nuvem (*AWS*).

A API implementa as rotas:

| Método | Rota                 | Descrição |
|--------|-----------------------|-----------|
| GET    | `/products`          | Lista todos os produtos |
| GET    | `/products/:id`      | Retorna 1 produto por ID |
| POST   | `/products`          | Cadastra um produto |
| PUT    | `/products/:id`      | Atualiza um produto |
| DELETE | `/products/:id`      | Remove um produto |

---

## 🌐 Frontend
O frontend foi criado usando **HTML + CSS + JavaScript**, rodando em uma máquina virtual separada, conforme solicitado.

Ele se conecta ao backend chamando diretamente as rotas da API.

### Funcionalidades implementadas:
✔ Listagem de produtos  
✔ Cadastro de produtos  
✔ Atualização (update)  
✔ Exclusão  
✔ Busca por ID  
✔ Campo de descrição incluído (salvando no banco)  
✔ Visual aprimorado (UI mais profissional)



---

## 🛠️ Tecnologias Utilizadas

### **Backend**
- Node.js
- Express.js
- Supabase JS Client
- VM na nuvem (AWS)

### **Frontend**
- HTML5
- CSS3
- JavaScript

---
