# Compraê

Loja com backend Node.js e banco SQLite para contas, endereços, buscas, pedidos e anúncios de vendedores. Os pedidos ainda são simulados, sem pagamento ou envio.

## Executar no Windows / VS Code

No terminal do projeto, execute:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\iniciar.ps1
```

Abra **http://localhost:3000** no navegador, inclusive no navegador integrado do VS Code. Mantenha o terminal aberto; use `Ctrl+C` para parar. Também há a tarefa **Compraê: iniciar site e banco** em **Terminal → Executar Tarefa**.

O projeto usa Node.js 24 ou superior, sem pacotes externos para o servidor. O script procura o Node instalado e, neste computador, pode usar o runtime já disponível do Codex. Com Node no PATH, também funciona:

```sh
npm start
```

Para apresentar pelo **Live Server**, clique com o botão direito em `dist/index.html` e escolha **Open with Live Server**. Catálogo, favoritos, sacola, cupons, cadastro, login, perfil, endereços, buscas, pedidos simulados e anúncios funcionam sem iniciar o Node. A área de vendedor exige entrar na conta e ativar a loja. Os dados ficam no navegador e persistem ao atualizar ou reabrir o mesmo endereço do Live Server.

O modo Live Server é local a cada navegador e endereço: não sincroniza contas entre dispositivos nem com o banco SQLite do Node. Para usar o banco real, abra **http://localhost:3000** com o servidor acima. Nessa versão, os cupons e preços são validados pelo servidor ao registrar o pedido. Não há migração automática entre as contas locais do Live Server e as contas do banco.

## O que fica salvo

- Conta: nome, e-mail único, CPF, data de nascimento e hash da senha. O CPF e a data de nascimento não são exibidos publicamente.
- Loja: nome comercial, e-mail, telefone com DDD, CNPJ opcional, descrição e foto de perfil. A descrição e a foto aparecem no detalhe dos produtos anunciados.
- Anúncios: proprietário, nome, categoria, descrição, foto, preço, estoque e status. Produtos ativos com estoque entram no catálogo e podem ser adicionados à sacola.
- Endereço: CEP, rua, bairro, cidade, estado, número e complemento.
- Buscas: as últimas 50 buscas feitas pelo campo de pesquisa enquanto a conta está conectada; podem ser apagadas na conta.
- Pedidos: itens, quantidades, preços, total, destinatário, endereço da época e data. A tela mostra os 100 mais recentes; os anteriores continuam no banco.
- Sessões de login: tokens armazenados como hash, com validade de 7 dias; sair encerra a sessão atual.

No Live Server, contas e histórico ficam no armazenamento local do navegador. As senhas são guardadas como hash derivado com PBKDF2, mas quem tiver acesso ao perfil do navegador pode alterar os dados locais. Use esse modo para apresentação; o servidor Node é o modo com autenticação e banco.

A tela **Conta** mostra o endereço, os pedidos e as buscas. O cabeçalho recupera o CEP da conta. O checkout salva pedidos com status **simulado**, sem cobrar, reservar estoque ou contratar frete. Os preços são calculados pelo servidor; reenviar a mesma solicitação não duplica o pedido.

Carrinho e favoritos permanecem no navegador, separados por conta. Os itens escolhidos como visitante são levados à conta ao entrar. A Central do Vendedor mostra somente os anúncios da conta conectada. No modo Node, os anúncios ficam no SQLite e são visíveis para outros visitantes do mesmo servidor. No Live Server, ficam apenas no navegador em que foram publicados.

O coração no cabeçalho abre `/favoritos/`, onde os produtos podem ser revistos ou removidos. A página Sobre reúne links para Termos de Uso e Política de Privacidade, que descrevem as funções e os dados usados nesta versão.

Contato, Central de Ajuda, Formas de Pagamento, Trocas e Devoluções e Entrega e Frete têm conteúdo completo para apresentação. O e-mail, o endereço, os horários e os exemplos de frete nessas páginas são fictícios e identificados como ilustrativos. O checkout continua sem cobrança nem entrega real.

## Produtos e cupons

O catálogo tem oito fotografias reais, descrições próprias, detalhes de uso e produtos relacionados. As imagens são referências ilustrativas para produtos fictícios; veja as [fontes das fotos](docs/IMAGENS.md).

Na sacola e no checkout, use `COMPRAE10`, `COMPRAE15` ou `COMPRAE20` para descontos de 10%, 15% ou 20% sobre os produtos. É permitido um cupom por pedido. O servidor valida o cupom e recalcula o desconto conforme as quantidades, sem confiar em preços enviados pelo navegador. O histórico guarda subtotal, cupom, desconto e total da compra.

A atualização do banco é automática e preserva contas e pedidos anteriores. A tabela `coupons` permite desativar códigos, definir valor mínimo e validade.
Perfis de vendedor antigos recebem os campos de descrição e foto automaticamente, sem perder os dados existentes.

## Banco e arquivos

```text
server/index.cjs        servidor HTTP, autenticação e API
server/schema.sql      tabelas e índices
 data/comprae.sqlite    banco local, criado automaticamente
 dist/                 HTML, CSS, JavaScript e imagens
 tests/backend.test.cjs testes da API e persistência
 tests/database.browser.cjs testes completos no navegador
 iniciar.ps1           inicializador Windows
```

O banco fica fora de `dist` e não é servido pela internet nem incluído no Git. Para fazer uma cópia simples, pare o servidor e copie `data/comprae.sqlite`; se houver arquivos `-wal` e `-shm`, mantenha-os junto da cópia. Não apague o banco para reiniciar o site.

O esquema contém `users`, `addresses`, `sessions`, `searches`, `products`, `seller_profiles`, `seller_products`, `coupons`, `orders` e `order_items`. O catálogo inicial é cadastrado automaticamente. Os testes usam bancos temporários separados, sem adicionar contas de teste ao banco da loja.

## Configuração e publicação

Variáveis opcionais: `PORT` (3000), `HOST` (127.0.0.1), `DATABASE_PATH` e `APP_ORIGIN`. Em produção, use HTTPS, `NODE_ENV=production` para cookies Secure, uma origem pública explícita em `APP_ORIGIN` e armazenamento persistente para SQLite. O servidor não confia em cabeçalhos de proxy para identificar o cliente.

A configuração antiga `.openai/hosting.json` publica apenas os arquivos estáticos. Para publicar as contas e o banco, a hospedagem precisa executar Node.js e preservar o arquivo SQLite. Recuperação de senha, verificação de e-mail e pagamentos não estão implementados.

## Consulta de CEP

A janela do cabeçalho, o cadastro e o checkout consultam [ViaCEP](https://viacep.com.br/). Apenas o CEP é enviado ao serviço. A consulta requer internet, valida 8 dígitos, trata erros e tem timeout de 8 segundos. O usuário pode ajustar o endereço manualmente no checkout. A consulta não confirma cobertura, preço ou prazo de entrega.

## Testes

Com Node.js 24 ou superior:

```sh
npm test
```

A suíte cobre autenticação, cookies, validação, isolamento de contas, preços no servidor, pedidos sem duplicidade, expiração, limitação de tentativas e persistência após reiniciar.

Para os testes de navegador, disponibilize o pacote `playwright` e Chromium; alternativamente, informe o executável de um navegador em `BROWSER_PATH`:

```sh
node tests/database.browser.cjs
```

`tests/cep.browser.cjs` também executa essa suíte por compatibilidade. As consultas de CEP são simuladas nos testes automatizados, para que não dependam de um serviço externo. A API e o banco são reais durante os testes.
