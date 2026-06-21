import express from "express";
import { Sequelize, DataTypes } from "sequelize";

// cria conexao com banco em memoria
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
});

// define o modelo de dados para a pocao
const Pocao = sequelize.define("Pocao", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: true
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: false
});

const app = express();
app.use(express.json());
app.use(express.static("public"));

// funcao para inserir os dados iniciais exigidos pelo professor
async function popularBanco() {
  await sequelize.sync({ force: true });

  await Pocao.bulkCreate([
    {
      nome: "Poção Blue Sky",
      descricao: "Essa poção provê um surto de inspiração por 24 horas. Foi utilizada por John Lennon quando escreveu Lucy in the Sky with Diamonds.",
      preco: 300,
      imagem: "https://i.ibb.co/ZzS7xb2/rsz-sky.png"
    },
    {
      nome: "Poção do Perfume Misterioso",
      descricao: "Essa poção faz com que você fique cheirando lilás e groselha por 24 dias. Essência muito admirada pelos bruxos.",
      preco: 200,
      imagem: "https://i.ibb.co/pyhZJXf/rsz-lilas.png"
    },
    {
      nome: "Poção de Pinus",
      descricao: "Essa poção faz com que você fique 10 cm mais alto! Observação: efeitos colaterais desconhecidos.",
      preco: 3000,
      imagem: "https://i.ibb.co/DkzdL1q/rsz-pinus.png"
    },
    {
      nome: "Poção da Beleza Eterna",
      descricao: "Veneno que mata rápido.",
      preco: 100,
      imagem: "https://i.ibb.co/9p872NK/rsz-1beleza.png"
    },
    {
      nome: "Poção do Arco íro",
      descricao: "Traz felicidade momentânea. Pode durar de 10 minutos a 2 dias.",
      preco: 120,
      imagem: "https://i.ibb.co/PrC09MP/rsz-2unicornio.png"
    },
    {
      nome: "Caldeirão das Verdades Secretas",
      descricao: "As pessoas lhe dirão apenas verdades por 1 hora. É necessário beber os 5L.",
      preco: 150,
      imagem: "https://i.ibb.co/s9Lyvj8/rsz-verdades.png"
    }
  ]);
}

// rota para listar todas as pocoes cadastradas
app.get("/pocoes", async (req, res) => {
  try {
    const todasPocoes = await Pocao.findAll();
    res.json(todasPocoes);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao listar as pocoes" });
  }
});

// rota para criar uma nova pocao no banco de dados
app.post("/pocoes", async (req, res) => {
  try {
    const { nome, descricao, imagem, preco } = req.body;
    const pocaoCriada = await Pocao.create({ nome, descricao, imagem, preco });
    res.status(201).json(pocaoCriada);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar a pocao" });
  }
});

// rota para remover uma pocao de acordo com o identificador
app.delete("/pocoes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultadoRemocao = await Pocao.destroy({
      where: { id: id }
    });

    if (resultadoRemocao === 1) {
      res.json({ mensagem: "Pocao removida com sucesso" });
    } else {
      res.status(404).json({ erro: "Pocao nao encontrada" });
    }
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao remover a pocao" });
  }
});

const porta = 3000;
app.listen(porta, async () => {
  await popularBanco();
  console.log(`Servidor rodando na porta ${porta}`);
});
