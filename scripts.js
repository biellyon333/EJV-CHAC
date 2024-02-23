document.addEventListener("DOMContentLoaded", function() {
    const produtosSection = document.getElementById("produtos");
    const adicionarProdutoButton = document.getElementById("adicionar-produto");
    const modal = document.getElementById("modal");
    const modalTitulo = document.getElementById("modal-titulo");
    const modalPreco = document.getElementById("modal-preco");
    const modalMetros = document.getElementById("modal-metros");
    const modalLocalizacao = document.getElementById("modal-localizacao");
    const fecharModal = document.querySelector(".fechar");

    // Carregar produtos do armazenamento local ao iniciar
    carregarProdutos();

    adicionarProdutoButton.addEventListener("click", function() {
        const senha = prompt("Digite a senha para adicionar um produto:");
        if (senha === "senha123") { // Defina sua senha aqui
            const nomeProduto = prompt("Digite o nome do produto:");
            const descricaoProduto = prompt("Digite a descrição do produto:");
            const imagemProduto = prompt("Digite a URL da imagem do produto:");

            if (nomeProduto && descricaoProduto && imagemProduto) {
                adicionarProduto(nomeProduto, descricaoProduto, imagemProduto);
            } else {
                alert("Por favor, preencha todos os campos.");
            }
        } else {
            alert("Senha incorreta. Você não tem permissão para adicionar produtos.");
        }
    });

    function adicionarProduto(nome, descricao, imagem) {
        const produtoDiv = criarProdutoDiv(nome, descricao, imagem);
        produtosSection.appendChild(produtoDiv);
        salvarProdutoLocalStorage(nome, descricao, imagem);
    }

    function criarProdutoDiv(nome, descricao, imagem) {
        const produtoDiv = document.createElement("div");
        produtoDiv.classList.add("produto");

        const imagemElement = document.createElement("img");
        imagemElement.src = imagem;
        imagemElement.alt = nome;

        const titulo = document.createElement("h2");
        titulo.textContent = nome;

        const descricaoElement = document.createElement("p");
        descricaoElement.textContent = descricao;

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.classList.add("remover-produto-button");
        botaoRemover.addEventListener("click", function() {
            produtoDiv.remove();
            removerProdutoLocalStorage(nome);
        });

        produtoDiv.appendChild(imagemElement);
        produtoDiv.appendChild(titulo);
        produtoDiv.appendChild(descricaoElement);
        produtoDiv.appendChild(botaoRemover);

        produtoDiv.addEventListener("click", function() {
            modal.style.display = "block";
            modalTitulo.textContent = nome;
            modalPreco.textContent = "R$ 100,00"; // Exemplo de preço
            modalMetros.textContent = "50 m²"; // Exemplo de metros
            modalLocalizacao.textContent = "Centro"; // Exemplo de localização
        });

        return produtoDiv;
    }

    function carregarProdutos() {
        const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        produtos.forEach(produto => {
            const { nome, descricao, imagem } = produto;
            const produtoDiv = criarProdutoDiv(nome, descricao, imagem);
            produtosSection.appendChild(produtoDiv);
        });
    }

    function salvarProdutoLocalStorage(nome, descricao, imagem) {
        const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        produtos.push({ nome, descricao, imagem });
        localStorage.setItem("produtos", JSON.stringify(produtos));
    }

    function removerProdutoLocalStorage(nome) {
        let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
        produtos = produtos.filter(produto => produto.nome !== nome);
        localStorage.setItem("produtos", JSON.stringify(produtos));
    }

    fecharModal.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

