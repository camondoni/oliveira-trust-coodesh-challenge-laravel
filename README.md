# Oliveira Trust PHP Money Converter - Caio André Mondoni

Desafio proposto pela Oliveira Trust, onde o objetivo é implementar uma aplicação que faça a conversão da nossa moeda nacional para uma moeda estrangeira, aplicando algumas taxas e regras,
Pode utilizar qualquer API para conversão de valores, utilizando a API: https://docs.awesomeapi.com.br/api-de-moedas

# Regras de négocio

* Moeda de origem BRL;
* Informar uma moeda de compra que não seja BRL (exibir no mínimo 2 opções);
* Valor da Compra em BRL (deve ser maior que R$ 1.000,00 e menor que R$ 100.000,00)
* Formas de pagamento (taxas aplicadas no valor da compra e aceitar apenas as opções abaixo)
* Para pagamentos em boleto, taxa de 1,45%
* Para pagamentos em cartão de crédito, taxa de 7,63%
* Aplicar taxa de 2% pela conversão para valores abaixo de R$ 3.000,00 e 1% para valores maiores que R$ 3.000,00,
essa taxa deve ser aplicada apenas no valor da compra e não sobre o valor já com a taxa de forma de pagamento.

# Tecnologias Utilizadas

-   Laravel v9.11
-   React v18.1.0

# Pré Requisitos

-   Node >= v14.18.1
-   Yarn
-   Composer
-   Postgres ou MySQL

# Instalação - Backend

    composer install

    altere o .env com suas credenciais do banco e as credenciais de email
        DB_CONNECTION=pgsql ou mysql
        DB_HOST=localhost
        DB_PORT=5432
        DB_DATABASE=databasename
        DB_USERNAME=postgres
        DB_PASSWORD=teste123

        MAIL_MAILER=smtp
        MAIL_HOST=smtp.gmail.com
        MAIL_PORT=465
        MAIL_USERNAME=seuemail
        MAIL_PASSWORD=suasenha
        MAIL_ENCRYPTION=tls
        MAIL_FROM_ADDRESS=seuemail
        MAIL_FROM_NAME=OliveiraTrust

    php artisan migrate
    php artisan db:seed --class=CotationFeeSeeder
    php artisan serve

# Instalação - Frontend

    abra a pasta react na raiz e rode os comandos:
    yarn install
    yarn start
    acesse http://localhost:3000

# Bonus realizados

-   Enviar cotação realizada por email ✅;
-   Autenticação de usuário ✅;
-   Histórico de cotações feita pelo usuário ❌;
-   Uma opção no painel para configurar as taxas aplicadas na conversão ✅;
