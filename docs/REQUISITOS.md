# Requisitos — backend da colinha

O front guarda a colinha na query da URL: os números dos seis votos (`df`, `de`, `s1`, `s2`, `gov`, `pr`) e, em cada voto preenchido, um comentário de até 210 caracteres (`cdf`, `cde`, `cs1`, `cs2`, `cgov`, `cpr`). Com os textos, o link fica longo demais para enviar à família.

O backend passa a guardar esses dados. O link compartilhado leva só um identificador curto. Quem abre o link recupera os votos e os comentários no servidor.

Estado atual: o backend guarda a colinha sob um identificador curto e estável. Quem tem o identificador lê e atualiza os seis slots, com número e comentário, sem conta de usuário. Esvaziar um slot apaga o número e o comentário daquele voto.

Stack: NestJS, na raiz deste repositório.

---

## Features

### 1. API NestJS

**Status:** implementado

Serviço NestJS separado do site estático, responsável por criar, ler e atualizar colinhas.

- [x] O projeto NestJS fica em `backend/`.
- [x] A API expõe as operações das features 2 a 5.
- [x] Não há conta de usuário. Quem tem o identificador lê e atualiza aquela colinha.



### 2. Salvar a colinha

**Status:** implementado

Uma colinha é o conjunto dos seis slots da urna. Cada slot guarda o número do candidato escolhido, ou fica vazio.

- [x] Criar uma colinha grava os números dos slots `df`, `de`, `s1`, `s2`, `gov` e `pr`.
- [x] Slot sem candidato fica vazio.
- [x] A resposta devolve um identificador curto e estável, próprio daquela colinha.
- [x] O identificador não muda quando os votos ou os comentários mudam.



### 3. Salvar os comentários

**Status:** implementado

Cada slot pode ter um comentário, o texto livre que o eleitor anota sobre aquela escolha.

- [x] Há no máximo um comentário por slot, independente dos outros.
- [x] O texto tem no máximo 210 caracteres. O que passar disso é recusado.
- [x] Comentário vazio não é gravado.
- [x] Comentário só existe em slot que tenha candidato.



### 4. Reabrir pelo identificador

**Status:** implementado

Abrir o link curto devolve a colinha completa, para o front montar os cards sem ler números e textos na URL.

- [x] A leitura pelo identificador devolve os seis slots, com número e comentário de cada um.
- [x] Identificador desconhecido responde que a colinha não existe.



### 5. Atualizar a mesma colinha

**Status:** implementado

Mudar um voto ou um comentário grava de novo o mesmo registro. O link enviado à família continua o mesmo.

- [x] Atualizar substitui números e comentários da colinha já salva.
- [x] O identificador da resposta é o mesmo da colinha atualizada.
- [x] Esvaziar um slot apaga o número e o comentário daquele voto.
- [x] Atualizar uma colinha que não existe responde que ela não existe.

---



## Tabela de IDs

| ID | Resumo | Prioridade | Depende de | Status |
|----|--------|------------|------------|--------|
| REQ-001 | Projeto NestJS na raiz do repositório | 1 | nenhuma | implementado |
| REQ-002 | Sem arquivos de teste | 2 | nenhuma | a implementar |

## REQ-001 — Projeto NestJS na raiz do repositório

**Status:** implementado
**Prioridade:** 1
**Depende de:** nenhuma

### Objetivo

O conteúdo da pasta `backend/` passa para a raiz deste repositório.

### Experiência desejada

- Quem abre o repositório encontra o projeto NestJS na raiz, com `package.json`, `src/` e a configuração do Nest.
- A pasta `backend/` não existe mais.

### Fora do escopo deste requisito

- Mudar o contrato da API de colinhas.
- Apagar arquivos de teste.

### Critérios de aceite

- [x] `package.json`, `src/` e os arquivos de configuração do NestJS ficam na raiz.
- [x] A pasta `backend/` não permanece.

## REQ-002 — Sem arquivos de teste

**Status:** a implementar
**Prioridade:** 2
**Depende de:** nenhuma

### Objetivo

O repositório não contém arquivos de teste.

### Experiência desejada

- Não há testes unitários nem de ponta a ponta no projeto.
- A pasta `test/` não existe.

### Fora do escopo deste requisito

- Mudar o comportamento da API de colinhas.
- Mover o projeto NestJS de pasta.

### Critérios de aceite

- [ ] Não há arquivos `*.spec.ts` nem `*.e2e-spec.ts`.
- [ ] A pasta `test/` não permanece.

## Fora deste recorte

- Trocar o front para chamar esta API no lugar da query longa.
- Cadastro, login e dono da colinha.
- Validar o número contra a base de candidatos do TSE.
- Impressão, fotos e demais comportamentos já descritos em `REQUISITOS.md`.
