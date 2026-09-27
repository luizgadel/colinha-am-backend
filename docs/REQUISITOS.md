# Requisitos — backend da colinha

O front guarda a colinha na query da URL: os números dos seis votos (`df`, `de`, `s1`, `s2`, `gov`, `pr`) e, em cada voto preenchido, um comentário de até 210 caracteres (`cdf`, `cde`, `cs1`, `cs2`, `cgov`, `cpr`). Com os textos, o link fica longo demais para enviar à família.

O backend passa a guardar esses dados. O link compartilhado leva só um identificador curto. Quem abre o link recupera os votos e os comentários no servidor.

Estado atual: criar e atualizar a colinha grava os seis números e, em cada slot com candidato, no máximo um comentário de até 210 caracteres. O identificador curto permanece o mesmo.

Stack: NestJS, no diretório `backend/`. O Next.js continua na raiz do repositório.

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

**Status:** a implementar

Abrir o link curto devolve a colinha completa, para o front montar os cards sem ler números e textos na URL.

- [ ] A leitura pelo identificador devolve os seis slots, com número e comentário de cada um.
- [ ] Identificador desconhecido responde que a colinha não existe.



### 5. Atualizar a mesma colinha

**Status:** a implementar

Mudar um voto ou um comentário grava de novo o mesmo registro. O link enviado à família continua o mesmo.

- [ ] Atualizar substitui números e comentários da colinha já salva.
- [ ] O identificador da resposta é o mesmo da colinha atualizada.
- [ ] Esvaziar um slot apaga o número e o comentário daquele voto.
- [ ] Atualizar uma colinha que não existe responde que ela não existe.

---



## Fora deste recorte

- Trocar o front para chamar esta API no lugar da query longa.
- Cadastro, login e dono da colinha.
- Validar o número contra a base de candidatos do TSE.
- Impressão, fotos e demais comportamentos já descritos em `REQUISITOS.md`.
