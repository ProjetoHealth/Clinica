# Clinica Integrada

Clinica integrada é um sistema web desenvolvido por alunos do grupo anima através do projeto HealthLab.

O BackEnd do sistema é desenvolvido em python utilizando a framework Flask.

## Instalação

Para instalação e execução do sistema algumas dependências devem ser instaladas.

Tendo o projeto em sua maquina será necessário ter o python instalado no ambiente, para sua instalação basta acessar o site: www.python.org e executar o seu download e instalação.

Após instalação do python temos que instalar também a biblioteca do flask.
Através do terminal usaremos o gerenciador de pacotes "pip" para realizar a instalação dos pacotes necessários para a aplicação.

Flask:
```bash
pip install Flask
```
Faça o mesmo processo para instalar qualquer outra dependência que for solicitada como por exemplo a do numpy.

Numpy:
```bash
pip install numpy
```
## Banco de Dados

Para que o backEnd funcione, será necessario também criarmos o banco de dados.

O script de criação do banco se encontra no seguinte caminho dentro dos arquivos: src/database/crud. Nesse caminho encontraremos o arquivo ddl2.sql onde teremos todo o script do banco de dados.

Basta pegarmos esse script e executarmos dentro de um servidor mySql. Após a criação do banco será necessário que também configuremos o arquivo connection.py, informando os parâmetros de conexão ao banco e seu respectivo caminho.


## Execução

Para executarmos o projeto é bem simples, basta abrir o terminal e digitar o seguinte comando:
```bash
python src/api.py
```

Estamos indicando o caminho onde se encontra o arquivo api.py e executando-o, caso tudo tenha sido configurado corretamente o sistema estará rodando e pronto para ser utilizado.
