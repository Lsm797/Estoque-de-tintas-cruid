# 🎨 Estoque de Tintas — CRUD em Python

Sistema de linha de comando para controle de estoque de tintas, com as quatro operações básicas de um **CRUD** (Create, Read, Update, Delete) e armazenamento em arquivo **JSON**.

Projeto desenvolvido para praticar lógica de programação, manipulação de arquivos e persistência de dados em Python.

---

## ✨ Funcionalidades

- 📋 **Listar** todas as tintas cadastradas em formato de tabela
- ➕ **Cadastrar** uma nova tinta
- 🔍 **Buscar** uma tinta pelo ID
- ✏️ **Atualizar** os dados de uma tinta (deixe o campo em branco para manter o valor atual)
- 🗑️ **Excluir** uma tinta pelo ID
- 💾 Os dados são salvos automaticamente após cada alteração

## 🗂️ Dados de cada tinta

| Campo        | Tipo    | Exemplo        |
|--------------|---------|----------------|
| `id`         | inteiro | `1` (automático) |
| `codigo`     | texto   | `TN-001`       |
| `nome`       | texto   | `Acrílica Fosca` |
| `cor`        | texto   | `Branco Neve`  |
| `tamanho`    | texto   | `3,6L`         |
| `quantidade` | inteiro | `12`           |
| `preco`      | decimal | `89.90`        |

## 🛠️ Tecnologias

- **Python 3** (somente bibliotecas padrão: `json` e `os`)
- **JSON** para persistência dos dados

## ▶️ Como executar

1. Tenha o [Python 3](https://www.python.org/downloads/) instalado.
2. Clone o repositório:
   ```bash
   git clone https://github.com/Lsm797/Estoque-de-tintas-cruid.git
   cd Estoque-de-tintas-cruid
   ```
3. Execute o programa:
   ```bash
   python estoque_tintas.py
   ```

> O arquivo `tintas.json` é criado automaticamente na primeira vez que uma tinta for cadastrada.

## 💻 Exemplo de uso

```
=== ESTOQUE DE TINTAS ===
1 - Listar tintas
2 - Cadastrar tinta
3 - Ler por ID
4 - Atualizar tinta
5 - Deletar tinta
0 - Sair
```

<!-- Dica: troque o bloco acima por um print do terminal rodando o programa -->

## ✅ Validações

- Todos os campos de texto são obrigatórios no cadastro
- Quantidade deve ser um número inteiro e preço um número válido
- IDs inválidos são tratados com mensagem de erro

## 🚧 Melhorias futuras

- [ ] Gerar IDs únicos mesmo após exclusões
- [ ] Validar quantidade e preço também na atualização
- [ ] Buscar tintas por nome ou cor
- [ ] Alerta de estoque baixo
- [ ] Migrar o armazenamento para um banco de dados (SQLite/MySQL)

## 👤 Autor

**Luis Gustavo** — Estudante de Análise e Desenvolvimento de Sistemas no IFBA – Campus Eunápolis
[GitHub](https://github.com/Lsm797)
