import json
import os

DB = "tintas.json"


# -------- carregar / salvar --------
def carregar():
    if not os.path.exists(DB):
        return []

    with open(DB, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except (json.JSONDecodeError, ValueError):
            return []


def salvar(lista):
    with open(DB, "w", encoding="utf-8") as f:
        json.dump(lista, f, indent=2, ensure_ascii=False)


# -------- operações CRUD --------
def listar(lista):
    if not lista:
        print("Nenhuma tinta cadastrada.")
        return

    print(" ID | Código   | Nome            | Cor        | Tam   | Qtd  | Preço")
    print("-" * 70)

    for item in lista:
        print(
            f"{item['id']:>3} | "
            f"{item['codigo']:^8} | "
            f"{item['nome']:^15} | "
            f"{item['cor']:^10} | "
            f"{item['tamanho']:^5} | "
            f"{item['quantidade']:^4} | "
            f"R$ {item['preco']:.2f}"
        )


def criar(lista, codigo, nome, cor, tamanho, quantidade, preco):
    novo_id = len(lista) + 1  # ID automático

    item = {
        "id": novo_id,
        "codigo": codigo,
        "nome": nome,
        "cor": cor,
        "tamanho": tamanho,
        "quantidade": quantidade,
        "preco": preco
    }

    lista.append(item)
    salvar(lista)
    return item


def ler(lista, item_id):
    return next((i for i in lista if i["id"] == item_id), None)


def atualizar(lista, item_id, codigo=None, nome=None, cor=None, tamanho=None, quantidade=None, preco=None):
    for item in lista:
        if item["id"] == item_id:

            if codigo:
                item["codigo"] = codigo

            if nome:
                item["nome"] = nome

            if cor:
                item["cor"] = cor

            if tamanho:
                item["tamanho"] = tamanho

            if quantidade is not None:
                item["quantidade"] = quantidade

            if preco is not None:
                item["preco"] = preco

            salvar(lista)
            return item

    return None


def deletar(lista, item_id):
    for item in lista:
        if item["id"] == item_id:
            lista.remove(item)
            salvar(lista)
            return True

    return False


# ------------------ menu ------------------
def menu():
    lista = carregar()

    while True:
        print("\n=== ESTOQUE DE TINTAS ===")
        print("1 - Listar tintas")
        print("2 - Cadastrar tinta")
        print("3 - Ler por ID")
        print("4 - Atualizar tinta")
        print("5 - Deletar tinta")
        print("0 - Sair")

        op = input("> ").strip()

        # LISTAR
        if op == "1":
            listar(lista)

        # CRIAR
        elif op == "2":

            codigo = input("Código do produto: ").strip()
            nome = input("Nome da tinta: ").strip()
            cor = input("Cor da tinta: ").strip()
            tamanho = input("Tamanho (ex: 3,6L): ").strip()

            try:
                quantidade = int(input("Quantidade: ").strip())
                preco = float(input("Preço: ").strip())
            except ValueError:
                print("Quantidade ou preço inválidos.")
                continue

            if not codigo or not nome or not cor or not tamanho:
                print("Todos os campos são obrigatórios.")
                continue

            criado = criar(lista, codigo, nome, cor, tamanho, quantidade, preco)

            print("Tinta cadastrada:", criado)

        # LER
        elif op == "3":

            try:
                item_id = int(input("ID: ").strip())
            except ValueError:
                print("ID inválido.")
                continue

            print(ler(lista, item_id) or "Não encontrado.")

        # ATUALIZAR
        elif op == "4":

            try:
                item_id = int(input("ID: ").strip())
            except ValueError:
                print("ID inválido.")
                continue

            codigo = input("Novo código (Enter para manter): ").strip()
            nome = input("Novo nome (Enter para manter): ").strip()
            cor = input("Nova cor (Enter para manter): ").strip()
            tamanho = input("Novo tamanho (Enter para manter): ").strip()

            quantidade_input = input("Nova quantidade (Enter para manter): ").strip()
            preco_input = input("Novo preço (Enter para manter): ").strip()

            quantidade = int(quantidade_input) if quantidade_input else None
            preco = float(preco_input) if preco_input else None

            resultado = atualizar(
                lista,
                item_id,
                codigo or None,
                nome or None,
                cor or None,
                tamanho or None,
                quantidade,
                preco
            )

            print(resultado or "Não encontrado.")

        # DELETAR
        elif op == "5":

            try:
                item_id = int(input("ID: ").strip())
            except ValueError:
                print("ID inválido.")
                continue

            print("Deletado." if deletar(lista, item_id) else "Não encontrado.")

        # SAIR
        elif op == "0":
            print("Saindo do sistema.")
            break

        else:
            print("Opção inválida.")


if __name__ == "__main__":
    menu()
