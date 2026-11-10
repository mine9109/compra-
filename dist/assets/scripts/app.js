(() => {
  'use strict';

  const products = [
    { id: 'orla', name: 'Luminária Orla', category: 'Casa', price: 289, tag: 'Para o seu canto', tone: 'blue', subtitle: 'Luz e personalidade na medida certa.', description: 'Uma luminária de linhas industriais para compor o canto de leitura ou a mesa de trabalho. A cúpula escura e o desenho simples combinam com madeira, tons claros e ambientes de inspiração urbana.', features: ['Cúpula em formato de sino', 'Visual industrial em tom grafite', 'Sugestão de uso: leitura e trabalho'], care: 'Limpe com pano seco e macio, sempre com a luminária desligada da tomada.', alt: 'Luminária grafite com cúpula inclinada diante de uma parede clara', position: 'center 48%' },
    { id: 'brisa', name: 'Vaso Brisa', category: 'Casa', price: 119, tag: 'Detalhes da casa', tone: 'cream', subtitle: 'Uma pausa suave na decoração.', description: 'Com silhueta arredondada e gargalo estreito, o Brisa valoriza um ramo solitário ou uma composição de flores secas. O tom claro traz equilíbrio a aparadores, estantes e cantos próximos à janela.', features: ['Silhueta arredondada e gargalo fino', 'Tonalidade clara com textura aparente', 'Sugestão de uso: arranjos secos e decoração'], care: 'Use pano macio para retirar o pó. Evite impactos e produtos abrasivos.', alt: 'Vaso claro de gargalo estreito apoiado junto a uma janela', position: 'center 72%' },
    { id: 'mare', name: 'Caixa de som Maré', category: 'Tecnologia', price: 399, tag: 'Na sua frequência', tone: 'dark', subtitle: 'Sua trilha sonora por perto.', description: 'Uma proposta de caixa de som compacta para acompanhar encontros, momentos de descanso e a rotina em casa. O formato cilíndrico e a textura escura dão presença à peça sem ocupar todo o ambiente.', features: ['Formato cilíndrico', 'Revestimento de aparência texturizada', 'Sugestão de uso: música em ambientes internos'], care: 'Mantenha longe de líquidos e limpe a superfície com pano seco. Conexões e autonomia dependem do modelo definitivo.', alt: 'Caixa de som portátil preta sobre uma mesa de madeira', position: 'center' },
    { id: 'cobre', name: 'Caderno Cobre', category: 'Papelaria', price: 74, tag: 'Ideias no papel', tone: 'orange', subtitle: 'Espaço para o que vem a seguir.', description: 'Listas, ideias de projeto e anotações do dia encontram lugar neste caderno de proposta minimalista. A referência com espiral e páginas pautadas combina com uma mesa organizada e uma rotina de escrita sem distrações.', features: ['Referência com encadernação em espiral', 'Páginas pautadas para organizar anotações', 'Sugestão de uso: estudos, listas e planejamento'], care: 'Guarde em local seco, protegido de umidade e da luz solar direta.', alt: 'Caderno espiral aberto com páginas pautadas sobre uma mesa clara', position: 'center 64%' },
    { id: 'atlantica', name: 'Garrafa Atlântica', category: 'Bem-estar', price: 129, tag: 'Para levar', tone: 'teal', subtitle: 'Hidratação faz parte do caminho.', description: 'Uma garrafa de desenho simples para manter água ao alcance durante o trabalho, os estudos ou um passeio. A cor verde e o acabamento de aparência fosca trazem um toque de natureza aos objetos de todo dia.', features: ['Silhueta cilíndrica com tampa', 'Visual verde de acabamento fosco', 'Sugestão de uso: hidratação na rotina'], care: 'Higienize antes do uso e siga as orientações do fabricante. Capacidade e desempenho térmico ainda não foram definidos.', alt: 'Garrafa verde com tampa sobre uma superfície branca', position: 'center 68%' },
    { id: 'ponto', name: 'Fone Ponto', category: 'Tecnologia', price: 249, tag: 'Seu momento', tone: 'blue', subtitle: 'Dê atenção ao que você quer ouvir.', description: 'Para reservar um momento à sua música, acompanhar uma aula ou ouvir um podcast. A proposta do Ponto reúne arco e conchas acolchoadas em um desenho discreto, fácil de combinar com a rotina de estudo e trabalho.', features: ['Formato com arco sobre a cabeça', 'Conchas com aparência acolchoada', 'Sugestão de uso: música, aulas e podcasts'], care: 'Limpe com pano macio e mantenha longe de umidade. A compatibilidade deve ser conferida no modelo definitivo.', alt: 'Fone de ouvido preto com arco e conchas acolchoadas sobre fundo amarelo', position: 'center' },
    { id: 'ninho', name: 'Manta Ninho', category: 'Casa', price: 189, tag: 'Hora de desacelerar', tone: 'clay', subtitle: 'Textura para os seus momentos de pausa.', description: 'A trama ampla e o tom neutro fazem da Ninho uma referência para deixar o sofá mais acolhedor. Use como destaque sobre o braço de uma poltrona ou para completar a composição da sala com almofadas e tecidos naturais.', features: ['Referência de trama larga', 'Tonalidade neutra fácil de combinar', 'Sugestão de uso: sofá, poltrona e decoração'], care: 'Siga a etiqueta de conservação do modelo final. Evite puxar fios e proteja a trama de objetos pontiagudos.', alt: 'Manta clara de tricô com trama larga sobre um sofá', position: 'center 63%' },
    { id: 'linha', name: 'Kit Linha', category: 'Papelaria', price: 58, tag: 'Para criar', tone: 'orange', subtitle: 'Do primeiro traço à próxima ideia.', description: 'Uma seleção de instrumentos de escrita para anotações, esboços e exercícios criativos. A referência reúne canetas, lápis e marcadores para inspirar um espaço de trabalho em que as ideias saem do papel em branco.', features: ['Referência com canetas, lápis e marcadores', 'Para experimentar diferentes traços', 'Sugestão de uso: escrita e esboços'], care: 'Mantenha as tampas fechadas após o uso. Quantidade e composição do kit serão definidas no cadastro comercial.', alt: 'Canetas, lápis e marcadores organizados ao redor de uma folha branca', position: 'center' }
  ];

  const policyPages = {
    '/sobre': { eyebrow: 'A Compraê', title: 'Escolhas que fazem sentido.', intro: 'A Compraê reúne produtos para a casa, a rotina e os momentos de pausa em uma experiência simples de explorar.', sections: [['Nossa proposta', 'A ideia é aproximar pessoas de objetos úteis e bonitos, com fotos, descrições claras e uma seleção fácil de navegar.'], ['Como o site funciona hoje', 'Você pode buscar produtos, montar a sacola, salvar favoritos e registrar pedidos simulados. Nesta versão não há cobrança nem envio de produtos.'], ['Transparência', 'As regras de uso e o tratamento dos dados estão explicados nos documentos abaixo. A identificação empresarial e um canal oficial de contato ainda não foram cadastrados.']], links: [['/termos', 'Termos de Uso', 'Veja como funcionam a conta, o catálogo, os cupons e os pedidos.'], ['/privacidade', 'Política de Privacidade', 'Saiba quais dados ficam no navegador e como o CEP é consultado.']] },
    '/contato': { eyebrow: 'Contato', title: 'Estamos por aqui.', intro: 'Veja como encontrar respostas e conheça os dados de atendimento criados para esta apresentação.', sections: [['Atendimento ilustrativo', 'E-mail: atendimento@comprae.example. Este endereço é fictício e não recebe mensagens. Não existe uma equipe de atendimento vinculada a esta versão do site.'], ['Horário de referência', 'Segunda a sexta, das 9h às 18h, no horário de Brasília. Horário criado para exemplificar como seria o atendimento de uma loja em operação.'], ['Endereço fictício', 'Rua das Ideias, 120, Centro, São Paulo — SP, CEP 01001-000. Este local é apenas um exemplo e não recebe visitas ou devoluções.'], ['Precisa de orientação agora?', 'Consulte a Central de Ajuda para ver como usar conta, CEP, cupons e pedidos de teste. Na sua conta, você encontra os pedidos registrados neste navegador ou no servidor local.']], links: [['/ajuda', 'Central de Ajuda', 'Respostas para as principais dúvidas.'], ['/conta', 'Minha conta', 'Veja seus dados e pedidos registrados.']] },
    '/ajuda': { eyebrow: 'Central de ajuda', title: 'Como podemos ajudar?', intro: 'Respostas rápidas sobre as funções disponíveis na Compraê.', sections: [['Como criar uma conta?', 'Abra Conta no cabeçalho, escolha Criar conta e informe nome, e-mail, CPF, data de nascimento, senha e CEP. No Live Server e no site estático, a conta fica salva apenas neste navegador.'], ['Onde vejo meus pedidos?', 'Entre em Conta e procure Meus pedidos. O checkout registra pedidos simulados: ele não cobra, reserva estoque nem solicita entrega.'], ['Como altero o CEP ou endereço?', 'Clique no CEP exibido no cabeçalho para consultar outro local pelo ViaCEP. Na sua conta, você também pode adicionar, editar, escolher ou remover endereços salvos.'], ['Como funcionam os cupons?', 'Na sacola, use COMPRAE10, COMPRAE15 ou COMPRAE20 para simular descontos de 10%, 15% ou 20% nos produtos. É permitido um cupom por pedido.'], ['Como salvo um produto?', 'Clique no coração do produto. O coração no cabeçalho abre seus favoritos. A sacola e os favoritos são separados por conta neste navegador.'], ['Como começo a vender?', 'Crie uma conta, abra a seção Venda na Compraê e ative o perfil de vendedor na página Conta. Depois, cadastre foto, descrição, preço e estoque dos seus produtos.'], ['Como entro em contato?', 'A página Contato mostra dados fictícios para apresentação. Esta versão ainda não oferece um canal de atendimento real.']], links: [['/contato', 'Contato', 'Veja os dados ilustrativos de atendimento.'], ['/entrega', 'Entrega e frete', 'Entenda o uso do CEP nesta versão.'], ['/pagamento', 'Formas de pagamento', 'Veja como funciona o checkout de teste.']] },
    '/privacidade': { eyebrow: 'Política de privacidade', title: 'Seus dados, com clareza.', intro: 'Esta política descreve o funcionamento da versão atual do site, inclusive quando aberta pelo Live Server.', sections: [['Quais dados você informa', 'Ao criar uma conta, você informa nome, e-mail, senha, CPF, data de nascimento e CEP. Também pode adicionar foto de perfil e endereços. Para ativar uma loja, informa nome comercial, e-mail e telefone; o CNPJ é opcional. Você também pode publicar uma descrição e uma foto de perfil da loja. Os anúncios incluem descrição, preço, estoque e foto do produto. Buscas, favoritos, itens da sacola, cupons, preferência de tema e pedidos simulados refletem suas ações no site.'], ['Onde os dados ficam', 'No site estático e no Live Server, esses dados ficam no armazenamento deste navegador e não são sincronizados entre dispositivos. A senha não é salva em texto puro: o navegador guarda um resultado derivado dela para conferir entradas futuras. Se a aplicação for executada com o servidor local, os dados da conta e dos pedidos podem ser guardados nesse servidor.'], ['Consulta de CEP', 'Quando você consulta um CEP, o navegador envia esse número ao serviço ViaCEP para obter o endereço. A resposta é usada para preencher os campos e pode ser salva no endereço escolhido por você. A ViaCEP é um serviço independente.'], ['Finalidades e controle', 'Os dados são usados para manter seu acesso, identificar a conta e a loja, mostrar o endereço selecionado, publicar anúncios, guardar favoritos, buscas e pedidos simulados e lembrar sua preferência de tema. A descrição e a foto da loja podem aparecer junto aos produtos publicados; CPF e data de nascimento não aparecem no catálogo. Você pode editar foto e endereços, limpar o histórico de buscas e remover favoritos. Para apagar os dados locais por completo, limpe os dados deste site nas configurações do navegador.'], ['E-mail de novidades e pagamentos', 'O formulário de novidades ainda não envia nem guarda o e-mail informado. O site não coleta dados de cartão ou realiza cobranças nesta versão.'], ['Responsável e contato', 'A identificação empresarial e um canal específico para solicitações de privacidade ainda não foram informados. Esses dados precisam ser publicados antes de uma operação comercial. Os direitos previstos na legislação de proteção de dados continuam aplicáveis.']], links: [['/termos', 'Termos de Uso', 'Leia as condições de uso da versão atual.'], ['/sobre', 'Sobre a Compraê', 'Conheça a proposta do site.']] },
    '/termos': { eyebrow: 'Termos de uso', title: 'Regras claras para usar a Compraê.', intro: 'Estes termos descrevem as funções disponíveis nesta versão do site.', sections: [['Conta e acesso', 'Você pode criar uma conta com CPF e data de nascimento para salvar endereço, foto, buscas, favoritos e pedidos simulados. Pode ativar uma loja com dados comerciais e publicar produtos; anúncios ativos com estoque aparecem no catálogo. No site estático e no Live Server, o acesso fica vinculado aos dados deste navegador; ele não sincroniza automaticamente entre dispositivos. Mantenha sua senha e seu dispositivo protegidos.'], ['Catálogo e favoritos', 'Fotos, descrições, preços e disponibilidade representam o catálogo apresentado nesta versão e podem ser atualizados. O coração salva um produto na sua lista de favoritos neste navegador. Salvar um item não reserva estoque.'], ['Sacola, cupons e pedidos', 'A sacola e os cupons ajudam a simular valores. Finalizar o fluxo registra um pedido de teste; não há cobrança, contrato de compra, envio ou prazo de entrega confirmado nesta versão.'], ['CEP e serviços externos', 'A consulta de CEP usa a ViaCEP para preencher o endereço. A disponibilidade desse serviço pode afetar a busca de endereços; você pode conferir os dados antes de salvá-los.'], ['Uso adequado e alterações', 'Use o site sem tentar prejudicar outras pessoas ou o funcionamento da aplicação. As funções e estes termos podem ser atualizados; a versão publicada será exibida aqui. Nada neste texto afasta direitos garantidos pela legislação aplicável.'], ['Privacidade', 'As informações sobre dados da conta, armazenamento no navegador e consulta de CEP estão na Política de Privacidade, acessível nesta página e no rodapé.']], links: [['/privacidade', 'Política de Privacidade', 'Entenda o uso e o armazenamento dos seus dados.'], ['/sobre', 'Sobre a Compraê', 'Volte à apresentação do site.']] },
    '/trocas': { eyebrow: 'Trocas e devoluções', title: 'Tudo claro depois da escolha.', intro: 'Os pedidos desta versão são simulados: não há entrega, pagamento ou devolução real a solicitar.', sections: [['O que acontece nesta versão', 'Ao finalizar a sacola, o site registra um pedido de teste na sua conta. Nenhum produto é enviado e nenhum valor é cobrado. Por isso, não há troca, postagem de retorno ou reembolso a processar aqui.'], ['Exemplo de fluxo para uma loja real', 'Em uma operação comercial, a pessoa localizaria o pedido na conta, informaria o motivo e receberia instruções para envio ou coleta. Esse fluxo ainda não está ativo na Compraê.'], ['Direito de arrependimento', 'Em compras feitas pela internet no Brasil, o Código de Defesa do Consumidor prevê o direito de arrependimento em até sete dias a partir do recebimento do produto. Saiba mais na <a href="https://www.gov.br/mj/pt-br/assuntos/arquivos-imprensa/senacon/cartilha-black-friday-senacon-2025" target="_blank" rel="noopener noreferrer">orientação oficial da Senacon</a>.'], ['Reembolso e atendimento', 'Como não há cobrança nesta versão, não existe valor a estornar. O e-mail e o endereço mostrados em Contato são fictícios e não devem ser usados para enviar produtos ou solicitações reais.']], links: [['/contato', 'Contato', 'Entenda quais dados de contato são ilustrativos.'], ['/termos', 'Termos de uso', 'Leia as regras desta versão do site.']] },
    '/entrega': { eyebrow: 'Entrega e frete', title: 'Seu endereço no lugar certo.', intro: 'Consulte o CEP e prepare o endereço do pedido. O envio de produtos ainda não está ativo.', sections: [['Consulta de CEP', 'O CEP informado no cabeçalho, no cadastro ou no checkout é consultado no ViaCEP para preencher rua, bairro, cidade e estado. Confira os dados e complete número e complemento quando necessário.'], ['Cobertura e transportadora', 'Esta versão não tem transportadora contratada nem regiões atendidas definidas. Salvar um endereço ou registrar um pedido de teste não agenda uma entrega.'], ['Exemplo ilustrativo de frete', 'Para mostrar como uma tabela futura poderia funcionar: Sudeste, R$ 18 e 3 a 6 dias úteis; Sul e Centro-Oeste, R$ 25 e 5 a 8 dias úteis; Norte e Nordeste, R$ 34 e 7 a 12 dias úteis. Esses valores e prazos são fictícios, não são calculados na sacola e não representam uma oferta de envio.'], ['Quando o pedido aparecer na conta', 'O histórico da conta mostra o endereço e os produtos registrados no teste. Não existe código de rastreio ou previsão de entrega para esses pedidos.']], links: [['/ajuda', 'Central de Ajuda', 'Veja como alterar o CEP e seus endereços.'], ['/pagamento', 'Formas de pagamento', 'Entenda a etapa final do pedido de teste.']] },
    '/pagamento': { eyebrow: 'Formas de pagamento', title: 'Valores claros na sacola.', intro: 'O checkout desta versão registra pedidos de teste e não processa pagamentos.', sections: [['Como funciona agora', 'Adicione produtos à sacola, confira o resumo e finalize para registrar o pedido simulado na sua conta. O site não pede dados de cartão, não gera Pix ou boleto e não cobra nenhum valor.'], ['Cupons disponíveis', 'COMPRAE10, COMPRAE15 e COMPRAE20 simulam descontos de 10%, 15% e 20% sobre os produtos. A sacola aceita um cupom por pedido e mostra o desconto antes de registrar o pedido.'], ['Meios de pagamento ilustrativos', 'Pix, cartão de crédito e boleto são exemplos de opções que uma futura loja poderia oferecer. Nenhuma dessas integrações está habilitada aqui; também não há parcelamento ativo.'], ['Segurança e comprovantes', 'Não informe números de cartão ou chaves de pagamento em campos do site. O histórico da conta é apenas um registro da simulação, não um comprovante de compra ou pagamento.']], links: [['/carrinho', 'Sua sacola', 'Confira produtos e experimente um cupom.'], ['/ajuda', 'Central de Ajuda', 'Tire dúvidas sobre pedidos simulados.']] }
  };

  const app = document.querySelector('#app');
  const siteRoot = new URL('../../', document.querySelector('script[src*="assets/scripts/app.js"]').src);
  const assetUrl = name => new URL(`assets/${name}`, siteRoot).href;
  const routeUrl = route => {
    const [routePath, search = ''] = route.split('?');
    const location = routePath === '/' ? '' : `${routePath.replace(/^\/+|\/+$/g, '')}/`;
    return new URL(`${location}${window.location.protocol === 'file:' ? 'index.html' : ''}${search ? `?${search}` : ''}`, siteRoot).href;
  };
  const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const cartKey = () => getSession() ? `comprae-cart-user-${getSession().id}` : 'comprae-cart';
  const favoriteKey = () => getSession() ? `comprae-favorites-user-${getSession().id}` : 'comprae-favorites';
  const getCart = () => JSON.parse(localStorage.getItem(cartKey()) || '[]');
  const saveCart = cart => { localStorage.setItem(cartKey(), JSON.stringify(cart)); orderRequestId = null; if (!cart.length) localStorage.removeItem(`${cartKey()}-coupon`); };
  const getFavorites = () => {
    try { const ids = JSON.parse(localStorage.getItem(favoriteKey()) || '[]'); return Array.isArray(ids) ? ids.filter(id => allProducts().some(product => product.id === id)) : []; }
    catch { return []; }
  };
  let accountState = { user: null, searches: [], orders: [] };
  let backendReady = false;
  let orderRequestId = null;
  const localAccountsKey = 'comprae-local-accounts-v1';
  const localSessionKey = 'comprae-local-session-v1';
  const readLocalAccounts = () => { try { return JSON.parse(localStorage.getItem(localAccountsKey) || '[]'); } catch { return []; } };
  const saveLocalAccounts = accounts => localStorage.setItem(localAccountsKey, JSON.stringify(accounts));
  const localHistoryKey = (kind, id) => `comprae-local-${kind}-${id}`;
  const readLocalHistory = (kind, id) => { try { return JSON.parse(localStorage.getItem(localHistoryKey(kind, id)) || '[]'); } catch { return []; } };
  const bytesToHex = bytes => Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
  async function hashLocalPassword(password, salt) {
    if (!crypto.subtle) throw new Error('Abra o projeto pelo Live Server para usar a conta.');
    const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
    const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: new TextEncoder().encode(salt), iterations: 180000 }, material, 256);
    return bytesToHex(new Uint8Array(bits));
  }
  const localAccountView = account => ({ id: account.id, name: account.name, email: account.email, address: account.address, hasIdentity: Boolean(account.cpf && account.birthDate), cpfLast4: account.cpf?.slice(-4) || null });
  const validCpf = value => {
    const digits = String(value || '').replace(/\D/g, '');
    if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;
    for (let length = 9; length < 11; length++) {
      const sum = Array.from(digits.slice(0, length), Number).reduce((total, digit, index) => total + digit * (length + 1 - index), 0);
      if ((sum * 10 % 11) % 10 !== Number(digits[length])) return false;
    }
    return true;
  };
  const validBirthDate = value => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value && date.getTime() <= Date.now();
  };
  function restoreLocalSession() {
    const account = readLocalAccounts().find(item => item.id === localStorage.getItem(localSessionKey));
    accountState = { user: account ? localAccountView(account) : null, searches: account ? readLocalHistory('searches', account.id) : [], orders: account ? readLocalHistory('orders', account.id) : [] };
  }
  function persistLocalUser() {
    const user = getSession(); if (!user || backendReady) return;
    const accounts = readLocalAccounts(); const existing = accounts.find(item => item.id === user.id);
    if (existing) { existing.address = user.address; existing.name = user.name; saveLocalAccounts(accounts); }
  }
  async function localRegisterLogin(mode, payload) {
    const accounts = readLocalAccounts();
    const mail = String(payload.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) throw new Error('Informe um e-mail válido.');
    if (typeof payload.password !== 'string' || payload.password.length < 8 || payload.password.length > 128) throw new Error('A senha deve ter entre 8 e 128 caracteres.');
    let account = accounts.find(item => item.email === mail);
    if (mode === 'signup') {
      if (account) throw new Error('E-mail já cadastrado neste navegador. Entre com sua senha.');
      const name = String(payload.name || '').trim();
      if (name.length < 2 || name.length > 100) throw new Error('Informe seu nome.');
      const cpf = String(payload.cpf || '').replace(/\D/g, '');
      if (!validCpf(cpf)) throw new Error('Informe um CPF válido.');
      if (accounts.some(item => item.cpf === cpf)) throw new Error('CPF já cadastrado neste navegador.');
      if (!validBirthDate(payload.birthDate)) throw new Error('Informe uma data de nascimento válida.');
      if (!payload.address?.cep) throw new Error('Consulte um CEP válido.');
      const salt = bytesToHex(crypto.getRandomValues(new Uint8Array(16)));
      account = { id: crypto.randomUUID(), name, email: mail, cpf, birthDate: payload.birthDate, address: payload.address, salt, passwordHash: await hashLocalPassword(payload.password, salt) };
      accounts.push(account); saveLocalAccounts(accounts);
    } else {
      const candidate = await hashLocalPassword(payload.password, account?.salt || '0'.repeat(32));
      if (!account || candidate !== account.passwordHash) throw new Error('E-mail ou senha incorretos.');
    }
    localStorage.setItem(localSessionKey, account.id);
    return { user: localAccountView(account), searches: readLocalHistory('searches', account.id), orders: readLocalHistory('orders', account.id) };
  }
  const savedTheme = localStorage.getItem('comprae-theme');
  document.documentElement.dataset.theme = savedTheme === 'dark' || (savedTheme !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  const getSession = () => accountState.user;
  const profileScope = () => getSession() ? `user-${getSession().id}` : 'local';
  const profileKey = () => `comprae-profile-${profileScope()}`;
  const addressesKey = () => `comprae-addresses-${profileScope()}`;
  const selectedAddressKey = () => `comprae-selected-address-${profileScope()}`;
  const getProfile = () => { if (getSession() && accountState.profile) return accountState.profile; try { return JSON.parse(localStorage.getItem(profileKey()) || '{}'); } catch { return {}; } };
  function getSavedAddresses() {
    if (getSession() && Array.isArray(accountState.addresses)) return accountState.addresses;
    try {
      const saved = JSON.parse(localStorage.getItem(addressesKey()) || 'null');
      if (Array.isArray(saved)) return saved;
    } catch {}
    const initial = getSession()?.address || (() => { try { return JSON.parse(localStorage.getItem('comprae-guest-delivery') || 'null'); } catch { return null; } })();
    return initial ? [{ id: 'initial', label: 'Principal', address: initial }] : [];
  }
  const saveAddresses = addresses => localStorage.setItem(addressesKey(), JSON.stringify(addresses));
  async function api(endpoint, method = 'GET', body) {
    let response;
    try {
      response = await fetch(new URL(`api/${endpoint}`, siteRoot), { method, credentials: 'same-origin', signal: AbortSignal.timeout(12000), headers: { 'Content-Type': 'application/json' }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
    } catch { throw new Error('Não foi possível conectar. Abra o site em http://localhost:3000 com o servidor iniciado.'); }
    if (!(response.headers.get('content-type') || '').includes('application/json')) throw new Error('Para usar sua conta, inicie o servidor e abra http://localhost:3000.');
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401 && !endpoint.startsWith('auth/')) accountState = { user: null, searches: [], orders: [] };
      throw new Error(data.error || 'Não foi possível concluir. Tente novamente.');
    }
    return data;
  }
  const getDelivery = () => {
    if (getSession() && Array.isArray(accountState.addresses)) return getSession().address || null;
    const addresses = getSavedAddresses();
    const selected = localStorage.getItem(selectedAddressKey());
    return (addresses.find(item => item.id === selected) || addresses[0])?.address || getSession()?.address || null;
  };
  function deliveryLabel() {
    const session = getSession();
    const address = getDelivery();
    return `<span class="delivery-pin" aria-hidden="true">⌖</span><span><small>${session ? `Enviar para ${escapeHtml((getProfile().name || session.name).split(' ')[0])}` : 'Local de entrega'}</small><strong>${address ? `${escapeHtml(address.localidade)} · ${escapeHtml(address.cep)}` : 'Informe seu CEP'}</strong></span><span aria-hidden="true">⌄</span>`;
  }
  function openDeliveryDialog() {
    if (document.querySelector('[data-delivery-dialog]')) return;
    const trigger = document.activeElement;
    const dialog = document.createElement('dialog');
    dialog.className = 'delivery-dialog';
    dialog.dataset.deliveryDialog = '';
    dialog.setAttribute('aria-labelledby', 'delivery-title');
    dialog.innerHTML = `<button class="dialog-close" type="button" aria-label="Fechar" data-delivery-close>×</button><h2 id="delivery-title">Onde você quer receber?</h2><p>Escolha o endereço que aparece no cabeçalho${getSession() ? ' e fica salvo no seu perfil' : ' durante suas visitas'}.</p>${cepLookup(true, 'header')}<button type="button" class="button button-primary" data-delivery-save>Usar este CEP</button>`;
    document.body.appendChild(dialog);
    const root = dialog.querySelector('[data-cep-lookup]');
    const cancel = bindCepLookup(root);
    dialog.addEventListener('close', () => { cancel(); dialog.remove(); if (trigger?.isConnected) trigger.focus(); });
    dialog.querySelector('[data-delivery-close]').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-delivery-save]').addEventListener('click', async event => {
      const button = event.currentTarget;
      button.disabled = true;
      const address = await root.lookup();
      button.disabled = false;
      if (!address || !dialog.isConnected) return;
      try {
        const session = getSession();
        if (session && backendReady) {
          const updated = await api('me/address', 'PUT', address);
          accountState.user = updated.user;
          if (updated.addresses) accountState.addresses = updated.addresses;
        } else localStorage.setItem('comprae-guest-delivery', JSON.stringify(address));
        if (session && !backendReady) { accountState.user.address = address; persistLocalUser(); }
        const addresses = getSavedAddresses();
        if (!Array.isArray(accountState.addresses)) {
        const existing = addresses.find(item => item.address.cep === address.cep && item.address.number === address.number);
        const id = existing?.id || crypto.randomUUID();
        if (existing) existing.address = address;
        else addresses.push({ id, label: `Endereço ${addresses.length + 1}`, address });
        saveAddresses(addresses);
        localStorage.setItem(selectedAddressKey(), id);
        }
      } catch (error) {
        root.querySelector('[data-cep-note]').textContent = error.message;
        return;
      }
      document.querySelectorAll('[data-delivery-label]').forEach(label => { label.innerHTML = deliveryLabel(); });
      document.querySelector('[data-checkout-form] [data-cep-lookup]')?.useAddress(address);
      dialog.close();
      if (path() === '/conta') render();
      toast('CEP de entrega salvo.');
    });
    dialog.showModal();
    root.querySelector('[data-cep]').focus();
  }
  const marketKey = 'comprae-market-products-v1';
  let marketProducts = [];
  const readMarketProducts = () => { try { const value = JSON.parse(localStorage.getItem(marketKey) || '[]'); return Array.isArray(value) ? value : []; } catch { return []; } };
  const saveMarketProducts = () => localStorage.setItem(marketKey, JSON.stringify(marketProducts));
  const sellerProfileKey = id => `comprae-seller-profile-user-${id || getSession()?.id}`;
  const readLocalSellerProfile = id => { try { return JSON.parse(localStorage.getItem(sellerProfileKey(id)) || 'null'); } catch { return null; } };
  const getCompany = () => {
    if (backendReady) return accountState.sellerProfile || null;
    if (!getSession()) return null;
    return readLocalSellerProfile(getSession().id);
  };
  const getSellerProducts = () => backendReady ? (accountState.sellerProducts || []) : marketProducts.filter(item => String(item.ownerId) === String(getSession()?.id));
  const sellerPhoto = value => typeof value === 'string' && value.length <= 430000 && /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(value) ? value : '';
  const catalogProduct = item => {
    const profile = backendReady ? null : readLocalSellerProfile(item.ownerId);
    const storeName = profile?.name || item.storeName || 'loja parceira';
    return { ...item, storeName, storeDescription: profile?.description || item.storeDescription || '', storePhoto: sellerPhoto(profile?.photo || item.storePhoto), tag: 'Da comunidade', subtitle: `Da loja ${storeName}`, alt: `Foto de ${item.name}`, position: 'center', features: [`Vendido por ${storeName}`, `${item.stock} em estoque`], care: 'Consulte a descrição do anúncio para informações sobre materiais e cuidados.' };
  };
  const allProducts = () => [...products, ...marketProducts.filter(item => item.status === 'Ativo' && item.stock > 0).map(catalogProduct)];
  const productImage = product => /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(product.image || '') ? product.image : assetUrl(`images/products/${product.id}.jpg`);
  async function imageFromFile(file) {
    if (!file || !['image/jpeg','image/png','image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) throw new Error('Escolha uma imagem JPG, PNG ou WebP de até 5 MB.');
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const image = canvas.toDataURL('image/jpeg', .72);
    if (image.length > 430000) throw new Error('A foto ficou grande demais. Escolha uma imagem menor.');
    return image;
  }
  const totalItems = () => getCart().reduce((sum, item) => sum + item.qty, 0);
  const path = () => `/${window.location.pathname.slice(siteRoot.pathname.length).replace(/(?:^|\/)index\.html$/, '').replace(/\/$/, '')}`;
  const query = () => new URLSearchParams(window.location.search);
  const productById = id => allProducts().find(product => product.id === id);
  const cartProducts = () => getCart().map(item => ({ ...item, product: productById(item.id) })).filter(item => item.product);
  const getCouponCode = () => localStorage.getItem(`${cartKey()}-coupon`) || '';
  let couponQuote = null;
  let quoteRevision = 0;
  const cartFingerprint = () => JSON.stringify([cartKey(), getCart(), getCouponCode()]);
  function localCartQuote(items, couponCode) {
    const code = couponCode.trim().toUpperCase();
    const percent = { COMPRAE10: 10, COMPRAE15: 15, COMPRAE20: 20 }[code];
    if (code && !Number.isInteger(percent)) throw new Error('Cupom inválido. Confira o código e tente novamente.');
    const quotedItems = items.map(item => {
      const product = productById(item.id);
      if (!product || !Number.isInteger(item.qty) || item.qty < 1 || item.qty > 99) throw new Error('Revise os itens e as quantidades da sacola.');
      if (product.ownerId && item.qty > product.stock) throw new Error(`Estoque insuficiente para ${product.name}.`);
      return { id: item.id, name: product.name, price_cents: Math.round(product.price * 100), qty: item.qty };
    });
    const subtotalCents = quotedItems.reduce((total, item) => total + item.price_cents * item.qty, 0);
    const discountCents = Math.round(subtotalCents * (percent || 0) / 100);
    return { items: quotedItems, subtotalCents, discountCents, totalCents: subtotalCents - discountCents, coupon: code ? { code, percent } : null };
  }
  function cartTotals() {
    const quote = couponQuote?.fingerprint === cartFingerprint() ? couponQuote.value : null;
    const subtotal = quote?.subtotalCents ?? cartProducts().reduce((sum, item) => sum + Math.round(item.product.price * 100) * item.qty, 0);
    const pending = Boolean(getCouponCode() && !quote);
    return `<div class="summary-line"><span>Subtotal</span><strong>${money(subtotal / 100)}</strong></div>${getCouponCode() ? `<div class="summary-line discount-line"><span>${escapeHtml(getCouponCode())}${quote?.coupon ? ` · ${quote.coupon.percent}%` : ''}</span><strong>${quote ? `− ${money(quote.discountCents / 100)}` : 'A conferir'}</strong></div>` : ''}<div class="summary-line"><span>Frete</span><span>A calcular</span></div><div class="summary-line summary-total"><span>Total em produtos</span><strong data-cart-total>${pending ? '—' : money((quote?.totalCents ?? subtotal) / 100)}</strong></div>`;
  }
  function couponForm() {
    return `<div class="coupon-box"><form data-coupon-form><label for="coupon-code">Tem um cupom?</label><div class="coupon-controls"><input id="coupon-code" class="field" name="coupon" placeholder="Digite seu cupom" maxlength="32" autocomplete="off" value="${escapeHtml(getCouponCode())}" required /><button class="button button-light button-small" type="submit">Aplicar</button></div></form><p class="coupon-note" role="status" aria-live="polite" data-coupon-note></p><button class="coupon-remove" type="button" data-coupon-remove ${getCouponCode() ? '' : 'hidden'}>Remover cupom</button><div class="coupon-suggestions"><small>Cupons disponíveis · use um por pedido</small><div>${[10,15,20].map(percent => `<button type="button" data-use-coupon="COMPRAE${percent}">COMPRAE${percent} <b>${percent}%</b></button>`).join('')}</div></div></div>`;
  }
  function bindCoupon() {
    const form = document.querySelector('[data-coupon-form]');
    if (!form) return;
    const root = form.closest('.summary');
    const note = root.querySelector('[data-coupon-note]');
    const update = () => {
      root.querySelector('[data-cart-totals]').innerHTML = cartTotals();
      root.querySelector('[data-coupon-remove]').hidden = !getCouponCode();
      const checkout = document.querySelector('[data-checkout-form] button[type="submit"]');
      if (checkout) checkout.disabled = Boolean(getCouponCode() && couponQuote?.fingerprint !== cartFingerprint());
    };
    async function refresh(code = getCouponCode(), apply = false) {
      const revision = ++quoteRevision;
      const identity = cartKey();
      const items = JSON.stringify(getCart());
      const submit = form.querySelector('button[type="submit"]');
      submit.disabled = true;
      note.textContent = code ? 'Conferindo seu cupom…' : '';
      note.classList.remove('error');
      update();
      try {
        // Static previews can calculate the catalog discounts without a Node server.
        // Connected stores always use the API, including its invalid/expired coupon errors.
        const quote = backendReady
          ? await api('cart/quote', 'POST', { items: JSON.parse(items), couponCode: code })
          : localCartQuote(JSON.parse(items), code);
        if (revision !== quoteRevision || !root.isConnected || identity !== cartKey() || items !== JSON.stringify(getCart())) return;
        if (apply) { localStorage.setItem(`${cartKey()}-coupon`, quote.coupon?.code || ''); orderRequestId = null; }
        couponQuote = { fingerprint: cartFingerprint(), value: quote };
        form.elements.coupon.value = getCouponCode();
        note.textContent = quote.coupon ? `Cupom aplicado! Você economiza ${money(quote.discountCents / 100)}.` : '';
        update();
      } catch (error) {
        if (revision !== quoteRevision || !root.isConnected) return;
        if (!apply) couponQuote = null;
        note.textContent = error.message;
        note.classList.add('error');
        update();
      } finally { if (revision === quoteRevision && root.isConnected) submit.disabled = false; }
    }
    form.addEventListener('submit', event => { event.preventDefault(); refresh(form.elements.coupon.value.trim().toUpperCase(), true); });
    root.querySelectorAll('[data-use-coupon]').forEach(button => button.addEventListener('click', () => { form.elements.coupon.value = button.dataset.useCoupon; refresh(button.dataset.useCoupon, true); }));
    root.querySelector('[data-coupon-remove]').addEventListener('click', () => {
      localStorage.removeItem(`${cartKey()}-coupon`); couponQuote = null; orderRequestId = null;
      form.elements.coupon.value = ''; update(); refresh();
    });
    refresh();
  }
  const cepCache = new Map();
  let disposeCep = () => {};
  let revealObserver;

  function cepLookup(checkout = false, id = 'delivery') {
    return `<div class="cep-lookup" data-cep-lookup>
      <label class="form-label" for="${id}-cep">${checkout ? 'CEP de entrega' : 'Consulte seu CEP'}</label>
      <div class="cep-controls"><input class="field" id="${id}-cep" name="cep" type="text" inputmode="numeric" autocomplete="postal-code" placeholder="00000-000" maxlength="9" pattern="[0-9]{5}-?[0-9]{3}" aria-describedby="${id}-cep-note" data-cep ${checkout ? 'required' : ''} /><button class="button button-outline" type="button" data-cep-button>Consultar CEP</button></div>
      <p class="form-note cep-note" id="${id}-cep-note" role="status" aria-live="polite" aria-atomic="true" data-cep-note>Digite 8 números para buscar o endereço.</p>
      <div class="cep-result" data-cep-result hidden></div>
      <p class="cep-disclaimer">Consulta de endereço via <a href="https://viacep.com.br/" target="_blank" rel="noopener noreferrer">ViaCEP</a>. Frete e prazo de entrega ainda não estão disponíveis.</p>
    </div>`;
  }

  function deliveryPage() {
    return policyPage(policyPages['/entrega']);
  }

  function checkoutAddress() {
    return `${cepLookup(true)}<div class="form-grid">
      <label class="form-label form-wide">Rua / logradouro<input class="field" name="street" autocomplete="address-line1" required /></label>
      <label class="form-label">Número<input class="field" name="number" placeholder="Ex.: 123 ou s/n" required /></label>
      <label class="form-label">Complemento <small>opcional</small><input class="field" name="complement" autocomplete="address-line2" placeholder="Apartamento, bloco…" /></label>
      <label class="form-label form-wide">Bairro<input class="field" name="neighborhood" required /></label>
      <label class="form-label">Cidade<input class="field" name="city" autocomplete="address-level2" required /></label>
      <label class="form-label">Estado<select class="field" name="state" autocomplete="address-level1" required><option value="">Selecione</option>${['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => `<option value="${uf}">${uf}</option>`).join('')}</select></label>
    </div>`;
  }

  function bindCepLookup(root) {
    const input = root.querySelector('[data-cep]');
    const button = root.querySelector('[data-cep-button]');
    const note = root.querySelector('[data-cep-note]');
    const result = root.querySelector('[data-cep-result]');
    const form = root.closest('[data-checkout-form], [data-address-form]');
    const filled = new Map();
    let controller;
    let revision = 0;
    let lastCep = '';
    let pending;
    const digits = () => input.value.replace(/\D/g, '');
    const status = (message, error = false) => {
      note.textContent = message;
      note.classList.toggle('error', error);
    };
    const busy = value => {
      root.setAttribute('aria-busy', String(value));
      button.disabled = value;
      button.textContent = value ? 'Consultando…' : 'Consultar CEP';
    };
    const cancel = () => { revision += 1; controller?.abort(); pending = null; busy(false); };
    const previousDispose = disposeCep;
    disposeCep = () => { previousDispose(); cancel(); };

    async function performLookup() {
      const cep = digits();
      if (!/^[0-9]{8}$/.test(cep)) {
        status('Informe um CEP com 8 números, por exemplo, 01001-000.', true);
        input.setAttribute('aria-invalid', 'true');
        return;
      }
      if (lastCep === cep) return root.address;
      cancel();
      const request = revision;
      const addressFields = form ? ['street', 'neighborhood', 'city', 'state'].map(name => form.elements.namedItem(name)) : [];
      const initialValues = addressFields.map(field => field.value);
      const activeController = new AbortController();
      controller = activeController;
      const timeout = window.setTimeout(() => activeController.abort(), 8000);
      busy(true);
      input.removeAttribute('aria-invalid');
      status('Buscando endereço…');
      try {
        let data = cepCache.get(cep);
        if (!data) {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: activeController.signal, referrerPolicy: 'no-referrer' });
          if (!response.ok) throw new Error('service');
          data = await response.json();
          if (data.erro) throw new Error('not-found');
          if (typeof data.cep !== 'string' || data.cep.replace(/\D/g, '') !== cep || typeof data.localidade !== 'string' || !data.localidade || !/^[A-Z]{2}$/.test(data.uf)) throw new Error('service');
          cepCache.set(cep, data);
        }
        if (request !== revision || !root.isConnected) return;
        lastCep = cep;
        root.address = data;
        const values = [data.logradouro || '', data.bairro || '', data.localidade, data.uf];
        addressFields.forEach((field, index) => {
          if (field.value === initialValues[index]) {
            field.value = values[index];
            filled.set(field, values[index]);
          }
        });
        result.innerHTML = `<strong>${escapeHtml(data.localidade)} / ${escapeHtml(data.uf)}</strong><span>${escapeHtml([data.logradouro, data.bairro].filter(Boolean).join(' · ') || 'CEP geral da localidade')}</span><span>CEP ${escapeHtml(data.cep)}</span>`;
        result.hidden = false;
        status(form ? 'Endereço encontrado. Confira os campos e complete número e complemento, se houver.' : 'Endereço encontrado.');
        return data;
      } catch (error) {
        if (request !== revision || !root.isConnected) return;
        const missing = error.message === 'not-found';
        if (missing) input.setAttribute('aria-invalid', 'true');
        status(missing ? 'CEP não encontrado. Confira os números e tente novamente.' : `Não foi possível consultar agora. Tente novamente.${form ? ' Você também pode preencher o endereço manualmente.' : ''}`, true);
      } finally {
        window.clearTimeout(timeout);
        if (request === revision) busy(false);
      }
    }

    function lookup() {
      if (pending) return pending;
      const promise = performLookup();
      pending = promise;
      promise.finally(() => { if (pending === promise) pending = null; });
      return promise;
    }
    root.lookup = lookup;
    root.useAddress = saved => {
      const previousCep = digits();
      cancel();
      input.value = saved.cep;
      root.address = saved;
      lastCep = saved.cep.replace(/\D/g, '');
      input.removeAttribute('aria-invalid');
      result.hidden = true;
      result.textContent = '';
      status('CEP salvo. Você pode consultar outro endereço.');
      if (form) {
        filled.clear();
        ['street', 'neighborhood', 'city', 'state', 'number', 'complement'].forEach((name, index) => {
          const field = form.elements.namedItem(name);
          field.value = [saved.logradouro || '', saved.bairro || '', saved.localidade, saved.uf, saved.number || '', saved.complement || ''][index];
          filled.set(field, field.value);
        });
        if (previousCep && previousCep !== lastCep) {
          form.elements.namedItem('number').value = '';
          form.elements.namedItem('complement').value = '';
        }
      }
    };
    const saved = getDelivery();
    if (saved && !root.closest('[data-address-form]')) root.useAddress(saved);

    input.addEventListener('input', () => {
      cancel();
      input.value = digits().slice(0, 8).replace(/^(\d{5})(\d)/, '$1-$2');
      lastCep = '';
      root.address = null;
      input.removeAttribute('aria-invalid');
      result.hidden = true;
      result.textContent = '';
      filled.forEach((value, field) => { if (field.value === value) field.value = ''; });
      filled.clear();
      status('Digite 8 números para buscar o endereço.');
    });
    input.addEventListener('blur', () => { if (digits().length === 8) lookup(); });
    input.addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); lookup(); } });
    button.addEventListener('click', lookup);
    return cancel;
  }

  function animateContent() {
    revealObserver?.disconnect();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.hero-inner, .page-heading .container, .section-head, .category-card, .product-card, .benefit, .delivery-card, .metric-card, .seller-panel').forEach((element, index) => {
      element.classList.add('reveal');
      element.style.setProperty('--reveal-delay', `${(index % 4) * 45}ms`);
      revealObserver.observe(element);
    });
  }

  function themeToggle() {
    const dark = document.documentElement.dataset.theme === 'dark';
    return `<button class="theme-toggle" type="button" data-theme-toggle aria-label="${dark ? 'Ativar modo claro' : 'Ativar modo escuro'}" title="${dark ? 'Modo claro' : 'Modo escuro'}" aria-pressed="${dark}">${dark ? '☀' : '☾'}</button>`;
  }

  function brandImages() {
    return `<img class="brand-logo-light" src="${assetUrl('branding/comprae-logo-transparent.png')}" alt="Compraê" width="2103" height="748" fetchpriority="high" /><img class="brand-logo-dark" src="${assetUrl('branding/comprae-logo-dark.png')}" alt="" aria-hidden="true" width="2103" height="748" />`;
  }

  function header() {
    const favoriteCount = getFavorites().length;
    return `
      <header class="site-header"><div class="nav-wrap">
        <a class="brand brand-image" href="/" aria-label="Compraê, início">${brandImages()}</a>
        <nav class="nav-links" aria-label="Navegação principal"><a href="/produtos">Produtos</a><a href="/categorias">Categorias</a><a href="/vendedor" ${path() === '/vendedor' ? 'aria-current="page"' : ''}>Venda na Compraê</a></nav>
        <div class="header-actions">${themeToggle()}<a class="favorites-link ${path() === '/favoritos' ? 'active' : ''}" href="/favoritos" aria-label="Favoritos, ${favoriteCount} ${favoriteCount === 1 ? 'produto' : 'produtos'}" title="Favoritos"><span aria-hidden="true">${favoriteCount ? '♥' : '♡'}</span>${favoriteCount ? `<small aria-hidden="true">${favoriteCount}</small>` : ''}</a><a class="header-action" href="/conta" aria-label="Área do cliente">Conta</a><a class="cart-link" href="/carrinho" aria-label="Sacola"><svg class="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 8h16l-1.2 12H5.2L4 8Z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/></svg><span class="cart-label">Sacola</span><span class="cart-count">${totalItems()}</span></a><button class="mobile-menu" type="button" aria-label="Abrir menu" data-menu>☰</button></div>
        <button class="header-delivery" type="button" data-delivery-open data-delivery-label aria-haspopup="dialog">${deliveryLabel()}</button><form class="search-form" data-search><input name="busca" type="search" placeholder="Buscar um produto" aria-label="Buscar produtos" value="${escapeHtml(query().get('busca') || '')}" /><button type="submit">Buscar</button></form>
      </div></header>`;
  }

  function footer() {
    return `<footer class="site-footer"><div class="container"><div class="footer-grid">
      <div><a class="brand brand-image footer-brand" href="/" aria-label="Compraê, início">${brandImages()}</a><p class="footer-copy">Uma curadoria de produtos para deixar a vida mais gostosa e simples.</p></div>
      <div><h2 class="footer-heading">Explorar</h2><div class="footer-links"><a href="/produtos">Todos os produtos</a><a href="/categorias">Categorias</a><a href="/favoritos">Favoritos</a><a href="/conta">Área do cliente</a><a href="/carrinho">Carrinho</a></div></div>
      <div><h2 class="footer-heading">Compraê</h2><div class="footer-links"><a href="/sobre">Sobre nós</a><a href="/contato">Contato</a><a href="/ajuda">Central de ajuda</a><a href="/pagamento">Formas de pagamento</a></div></div>
      <div><h2 class="footer-heading">Transparência</h2><div class="footer-links"><a href="/privacidade">Privacidade</a><a href="/termos">Termos de uso</a><a href="/trocas">Trocas e devoluções</a><a href="/entrega">Entrega e frete</a></div></div>
    </div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Compraê.</span><span>Feito para evoluir com clareza.</span></div></div></footer>`;
  }

  function productCard(product) {
    const favorite = getFavorites().includes(product.id);
    const url = `/produto/${encodeURIComponent(product.id)}`;
    return `<article class="product-card"><div class="product-art"><a class="product-photo-link" href="${url}" aria-label="Ver ${escapeHtml(product.name)}"><img class="product-photo" src="${escapeHtml(productImage(product))}" alt="${escapeHtml(product.alt)}" style="object-position:${escapeHtml(product.position)}" width="600" height="630" loading="lazy" decoding="async" /></a><span class="product-tag">${escapeHtml(product.tag)}</span><button class="favorite ${favorite ? 'is-fav' : ''}" type="button" data-favorite="${escapeHtml(product.id)}" aria-label="${favorite ? `Remover ${escapeHtml(product.name)} dos favoritos` : `Adicionar ${escapeHtml(product.name)} aos favoritos`}" aria-pressed="${favorite}">${favorite ? '♥' : '♡'}</button></div><div class="product-info"><div><p class="product-category">${escapeHtml(product.category)}</p><a href="${url}"><h3 class="product-name">${escapeHtml(product.name)}</h3></a><p class="product-meta">${escapeHtml(product.subtitle)}</p></div><span class="price">${money(product.price)}</span></div><div class="product-card-actions"><a class="text-link" href="${url}">Ver detalhes →</a><button class="button button-outline button-small" type="button" data-add="${escapeHtml(product.id)}" aria-label="Adicionar ${escapeHtml(product.name)} à sacola">+ Sacola</button></div></article>`;
  }

  function newsletter() {
    return `<section class="newsletter section"><div class="container newsletter-inner"><div><span class="eyebrow">Fique por perto</span><h2>Novidades boas chegam sem fazer barulho.</h2><p>Cadastre seu e-mail para receber curadorias, lançamentos e ideias para a rotina.</p></div><form class="newsletter-form" data-newsletter><input class="field" name="email" type="email" placeholder="seu@email.com" aria-label="Seu e-mail" required /><button class="button button-primary" type="submit">Quero receber</button><p class="form-note" data-newsletter-note></p></form></div></section>`;
  }

  const categoryImages = { Casa: 'casa', Tecnologia: 'tecnologia', 'Bem-estar': 'bem-estar', Papelaria: 'papelaria', Moda: 'moda', Outros: 'outros' };
  function categoryCard(category, subtitle) {
    const image = assetUrl(`images/categories/${categoryImages[category]}.jpg`);
    return `<a class="category-card" href="/produtos?categoria=${encodeURIComponent(category)}"><img class="category-photo" src="${image}" alt="" width="960" height="640" loading="lazy" decoding="async" /><strong>${escapeHtml(category)}</strong><span>${escapeHtml(subtitle)}</span></a>`;
  }

  function home() {
    return `<main id="main-content"><section class="hero"><div class="hero-inner"><span class="eyebrow">Curadoria para a vida real</span><h1>Coisas boas para viver bem.</h1><p>Objetos com intenção, beleza sem excesso e escolhas que acompanham o seu ritmo.</p><a class="button button-light" href="/produtos">Explorar produtos <span aria-hidden="true">↗</span></a></div></section>
      <section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">Por onde começar</span><h2>Um pouco de cada coisa.</h2></div><a class="text-link" href="/categorias">Ver categorias →</a></div><div class="category-grid">${[['Casa','Para deixar o espaço mais seu.'],['Tecnologia','Útil sem chamar mais atenção que você.'],['Bem-estar','Pequenos rituais, todos os dias.'],['Papelaria','Ideias que pedem espaço para acontecer.']].map(([name, subtitle]) => categoryCard(name, subtitle)).join('')}</div></div></section>
      <section class="section-tight"><div class="container"><div class="section-head"><div><span class="eyebrow">A curadoria da vez</span><h2>Escolhas que ficam.</h2></div><a class="text-link" href="/produtos">Ver tudo →</a></div><div class="product-grid">${products.slice(0, 4).map(productCard).join('')}</div></div></section>
      <section class="benefits section"><div class="container"><div class="benefit-grid"><div class="benefit"><span>01 — SEM PRESSA</span><h3>Menos ruído, mais intenção.</h3><p>Uma seleção curta para você encontrar o que procura sem se perder pelo caminho.</p></div><div class="benefit"><span>02 — COM CUIDADO</span><h3>Detalhes que fazem diferença.</h3><p>Informações claras e uma experiência pensada para caber na vida real.</p></div><div class="benefit"><span>03 — COM VERDADE</span><h3>Transparência do começo ao fim.</h3><p>Encontre fotos, descrições e detalhes para escolher com mais clareza.</p></div></div></div></section>${newsletter()}</main>`;
  }

  function productsPage() {
    const search = (query().get('busca') || '').trim().toLowerCase();
    const category = query().get('categoria') || 'Todas';
    const sort = query().get('ordem') || 'relevancia';
    let filtered = allProducts().filter(product => (!search || `${product.name} ${product.category} ${product.description}`.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().includes(search.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))) && (category === 'Todas' || product.category === category));
    if (sort === 'menor') filtered = filtered.sort((a, b) => a.price - b.price);
    if (sort === 'maior') filtered = filtered.sort((a, b) => b.price - a.price);
    return `<main id="main-content"><section class="page-heading"><div class="container"><span class="eyebrow">Nosso catálogo</span><h1>Produtos para uma vida mais leve.</h1><p>Encontre objetos para a casa, para criar e para acompanhar sua rotina. Explore as fotos e conheça os detalhes de cada escolha.</p></div></section><section class="section-tight"><div class="container"><div class="catalog-toolbar"><small>${filtered.length} ${filtered.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}</small><div class="toolbar-controls"><select class="select" aria-label="Filtrar por categoria" data-filter-category><option ${category === 'Todas' ? 'selected' : ''}>Todas</option>${['Casa', 'Tecnologia', 'Bem-estar', 'Papelaria', 'Moda', 'Outros'].map(item => `<option ${category === item ? 'selected' : ''}>${item}</option>`).join('')}</select><select class="select" aria-label="Ordenar produtos" data-filter-sort><option value="relevancia" ${sort === 'relevancia' ? 'selected' : ''}>Mais relevantes</option><option value="menor" ${sort === 'menor' ? 'selected' : ''}>Menor preço</option><option value="maior" ${sort === 'maior' ? 'selected' : ''}>Maior preço</option></select></div></div>${filtered.length ? `<div class="product-grid">${filtered.map(productCard).join('')}</div>` : `<div class="empty-state"><h2>Nada por aqui ainda.</h2><p>Tente buscar por outro termo ou limpe os filtros para ver a curadoria completa.</p><a class="button button-outline" href="/produtos">Limpar busca</a></div>`}</div></section></main>`;
  }

  function favoritesPage() {
    const saved = getFavorites().map(productById).filter(Boolean);
    return `<main id="main-content"><section class="page-heading"><div class="container"><span class="eyebrow">Sua seleção</span><h1>Seus favoritos.</h1><p>${saved.length ? `${saved.length} ${saved.length === 1 ? 'produto salvo' : 'produtos salvos'} para encontrar de novo quando quiser.` : 'Toque no coração dos produtos que quiser guardar para depois.'}</p></div></section><section class="section-tight"><div class="container">${saved.length ? `<div class="product-grid">${saved.map(productCard).join('')}</div><p class="favorites-note">Seus favoritos ficam salvos neste navegador.</p>` : `<div class="empty-state"><span class="empty-heart" aria-hidden="true">♡</span><h2>Ainda não há favoritos.</h2><p>Explore o catálogo e toque no coração dos produtos que você gostar.</p><a class="button button-primary" href="/produtos">Explorar produtos</a></div>`}</div></section></main>`;
  }

  function categoriesPage() {
    const counts = category => allProducts().filter(product => product.category === category).length;
    const cards = Object.keys(categoryImages).map(name => categoryCard(name, `${counts(name)} ${counts(name) === 1 ? 'produto' : 'produtos'}`)).join('');
    return `<main id="main-content"><section class="page-heading"><div class="container"><span class="eyebrow">Encontre seu caminho</span><h1>Explore por categoria.</h1><p>Escolha o que faz sentido para você.</p></div></section><section class="section"><div class="container"><div class="category-grid">${cards}</div></div></section></main>`;
  }
  function sellerByline(product) {
    if (!product.ownerId) return '';
    const photo = sellerPhoto(product.storePhoto);
    return `<div class="seller-product-store"><span class="seller-product-store-avatar">${photo ? `<img src="${photo}" alt="" />` : escapeHtml((product.storeName || 'L').charAt(0))}</span><span><strong>${escapeHtml(product.storeName || 'Loja parceira')}</strong>${product.storeDescription ? `<small>${escapeHtml(product.storeDescription)}</small>` : '<small>Produto de um vendedor da Compraê.</small>'}</span></div>`;
  }
  function detailPage(id) {
    const product = productById(id);
    if (!product) return notFound();
    const related = allProducts().filter(item => item.id !== id).sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category)).slice(0, 4);
    return `<main id="main-content"><div class="container"><nav class="breadcrumbs" aria-label="Caminho da página"><a href="/produtos">Produtos</a><span aria-hidden="true">/</span><a href="/produtos?categoria=${encodeURIComponent(product.category)}">${product.category}</a><span aria-hidden="true">/</span><span>${product.name}</span></nav><div class="detail"><figure class="detail-gallery"><a href="${productImage(product)}" target="_blank" rel="noopener" aria-label="Ampliar foto de ${product.name} em nova aba"><img class="detail-photo" src="${productImage(product)}" alt="${escapeHtml(product.alt)}" width="1200" height="1200" /></a><figcaption>Foto do produto · clique para ampliar</figcaption></figure><div class="detail-copy"><span class="eyebrow">${escapeHtml(product.category)} · ${escapeHtml(product.tag)}</span><h1>${escapeHtml(product.name)}</h1><p class="detail-subtitle">${escapeHtml(product.subtitle)}</p><span class="price">${money(product.price)}</span><p class="description">${escapeHtml(product.description)}</p>${sellerByline(product)}<ul class="product-features">${product.features.map(feature => `<li>${escapeHtml(feature)}</li>`).join('')}</ul><div class="purchase"><div class="quantity" data-quantity><button type="button" data-qty="minus" aria-label="Diminuir quantidade">−</button><span>1</span><button type="button" data-qty="plus" aria-label="Aumentar quantidade">+</button></div><button class="button button-primary" type="button" data-add="${product.id}">Adicionar à sacola</button></div><p class="detail-coupon">Use <strong>COMPRAE10</strong> na sacola e ganhe 10% de desconto nos produtos.</p><details class="product-disclosure"><summary>Cuidados e conservação</summary><p>${escapeHtml(product.care)}</p></details><details class="product-disclosure"><summary>Sobre este catálogo</summary><p>Fotografias reais ilustram os itens desta vitrine demonstrativa. Os nomes são fictícios; marcas visíveis nas fotos não indicam parceria. Modelo, medidas e especificações comerciais ainda precisam ser confirmados. Os pedidos são simulados, sem cobrança ou envio.</p></details></div></div><section class="section-tight"><div class="section-head"><div><span class="eyebrow">Continue explorando</span><h2>Também combina com você.</h2></div><a class="text-link" href="/produtos">Ver tudo →</a></div><div class="product-grid">${related.map(productCard).join('')}</div></section></div></main>`;
  }

  function cartPage() {
    const items = cartProducts();
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
    if (!items.length) return `<main id="main-content"><section class="page-heading"><div class="container"><span class="eyebrow">Sua sacola</span><h1>Leve só o que fizer sentido.</h1></div></section><section class="section"><div class="container"><div class="empty-state"><h2>Sua sacola está vazia.</h2><p>Que tal descobrir alguma coisa nova para a rotina?</p><a class="button button-primary" href="/produtos">Explorar produtos</a></div></div></section></main>`;
    return `<main id="main-content"><section class="page-heading"><div class="container"><span class="eyebrow">Sua sacola</span><h1>Quase lá.</h1><p>${totalItems()} ${totalItems() === 1 ? 'item escolhido' : 'itens escolhidos'} na sua sacola.</p></div></section><section class="section-tight"><div class="container cart-layout"><div class="cart-list">${items.map(item => `<div class="cart-row"><a class="cart-thumb" href="/produto/${item.id}"><img src="${productImage(item.product)}" alt="${escapeHtml(item.product.alt)}" width="84" height="84" /></a><div><h3>${escapeHtml(item.product.name)}</h3><p>${escapeHtml(item.product.category)} · ${money(item.product.price)} cada</p><div class="quantity"><button type="button" data-cart-qty="minus" data-id="${item.id}" aria-label="Diminuir quantidade">−</button><span>${item.qty}</span><button type="button" data-cart-qty="plus" data-id="${item.id}" aria-label="Aumentar quantidade">+</button></div><button class="remove" type="button" data-remove="${item.id}">Remover</button></div><span class="price">${money(item.product.price * item.qty)}</span></div>`).join('')}</div><aside class="summary"><h2>Resumo</h2>${couponForm()}<div data-cart-totals>${cartTotals()}</div><a class="button button-primary" href="/checkout">Continuar para checkout</a></aside></div></section></main>`;
  }

  function sellerAccountPanel() {
    const seller = getCompany();
    if (seller) return `<section class="account-history seller-account-panel"><h2>Sua loja</h2><div class="seller-account-summary">${sellerPhoto(seller.photo) ? `<img src="${sellerPhoto(seller.photo)}" alt="Foto da loja ${escapeHtml(seller.name)}" />` : `<span>${escapeHtml(seller.name.charAt(0))}</span>`}<div><strong>${escapeHtml(seller.name)}</strong><p>${escapeHtml(seller.description || 'Seu perfil de vendedor está ativo.')}</p></div></div><a class="button button-primary" href="/vendedor">Abrir Central do Vendedor</a> <a class="button button-outline" href="/vendedor?secao=empresa">Editar perfil da loja</a></section>`;
    const open = query().get('ativar-vendedor') === '1';
    return `<section class="account-history seller-account-panel"><h2>Venda na Compraê</h2><p>Ative sua loja para criar anúncios que aparecem no catálogo.</p><button class="button button-outline" type="button" data-seller-start ${open ? 'hidden' : ''}>Ativar perfil de vendedor</button><form class="form-stack seller-activation-form" data-seller-activation ${open ? '' : 'hidden'}><label class="form-label">Nome da loja<input class="field" name="name" maxlength="100" minlength="2" required /></label><label class="form-label">E-mail comercial<input class="field" name="email" type="email" maxlength="254" value="${escapeHtml(getSession()?.email || '')}" required /></label><label class="form-label">Telefone com DDD<input class="field" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="(11) 99999-9999" required /></label><label class="form-label">CNPJ <small>se tiver</small><input class="field" name="cnpj" inputmode="text" maxlength="18" placeholder="00.000.000/0000-00" /></label><label class="form-label">Descrição da loja <small>opcional</small><textarea class="field" name="description" rows="3" maxlength="600" placeholder="Conte o que sua loja oferece"></textarea></label><label class="form-label">Foto da loja <small>opcional</small><input class="field" type="file" accept="image/jpeg,image/png,image/webp" data-seller-photo-input /></label><div class="seller-profile-photo-preview" data-seller-photo-preview hidden></div>${getSession()?.hasIdentity ? '' : `<p class="form-note">Complete também seus dados pessoais para ativar a loja.</p><label class="form-label">CPF<input class="field" name="cpf" inputmode="numeric" maxlength="14" autocomplete="off" placeholder="000.000.000-00" required /></label><label class="form-label">Data de nascimento<input class="field" name="birthDate" type="date" required /></label>`}<button class="button button-primary" type="submit">Salvar e ativar loja</button><p class="form-note" data-seller-note role="status"></p></form></section>`;
  }

  function accountPage() {
    const session = getSession();
    const address = getDelivery();
    if (session) {
      const orders = accountState.orders.map(order => `<article class="history-order"><div class="summary-line"><strong>Pedido #${escapeHtml(order.id.slice(0, 8))}</strong><span>${new Date(order.createdAt).toLocaleDateString('pt-BR')}</span></div><p>Simulado · sem cobrança · ${money(order.totalCents / 100)}</p>${order.coupon ? `<p class="order-discount">Cupom ${escapeHtml(order.coupon.code)} · ${order.coupon.percent}% · economia de ${money(order.discountCents / 100)}</p>` : ''}<ul>${order.items.map(item => `<li>${item.quantity}× ${escapeHtml(item.name)} — ${money(item.unitPriceCents / 100)}</li>`).join('')}</ul><small>${escapeHtml(order.address.localidade)} / ${escapeHtml(order.address.uf)} · CEP ${escapeHtml(order.address.cep)}</small></article>`).join('');
      const searches = accountState.searches.map(item => `<li><a href="/produtos?busca=${encodeURIComponent(item.term)}">${escapeHtml(item.term)}</a><small>${new Date(item.createdAt).toLocaleString('pt-BR')}</small></li>`).join('');
      return `<main id="main-content"><section class="page-heading"><div class="container"><span class="eyebrow">Área do cliente</span><h1>Olá, ${escapeHtml(getProfile().name || session.name)}.</h1><p>Seu endereço, pedidos e buscas em um só lugar.</p></div></section><section class="section-tight"><div class="container account-layout"><aside class="account-aside"><h2>Sua conta.</h2><p>${escapeHtml(session.email)}</p><button class="button button-outline" type="button" data-logout>Sair da conta</button></aside><div class="account-card account-profile-card">${profilePanel()}${sellerAccountPanel()}<section class="account-history"><h2>Meus pedidos</h2>${orders || '<p>Nenhum pedido registrado ainda.</p>'}</section><section class="account-history"><h2>Buscas recentes</h2>${searches ? `<ul class="search-history">${searches}</ul><button class="button button-outline button-small" data-clear-searches type="button">Limpar histórico</button>` : '<p>Suas próximas buscas aparecerão aqui.</p>'}</section></div></div></section></main>`;
    }
    return `<main id="main-content"><section class="page-heading"><div class="container"><span class="eyebrow">Área do cliente</span><h1>Seu espaço, do seu jeito.</h1><p>${new URLSearchParams(window.location.search).get('next')?.startsWith('/vendedor') ? 'Entre ou crie sua conta para acessar a Central do Vendedor.' : 'Entre para recuperar seu endereço e acompanhar seus pedidos.'}</p></div></section><section class="section-tight"><div class="container account-layout"><aside class="account-aside"><h2>Tudo salvo na sua conta.</h2><p>Seu CEP, histórico de buscas e pedidos ficam disponíveis quando você entrar novamente.</p>${backendReady ? '' : '<p class="form-note">No Live Server, os dados da conta ficam salvos somente neste navegador.</p>'}</aside><div class="account-card"><div class="tabs"><button class="tab active" type="button" data-tab="login" aria-pressed="true">Entrar</button><button class="tab" type="button" data-tab="signup" aria-pressed="false">Criar conta</button></div><form class="form-stack" data-account-form data-mode="login"><label class="form-label">E-mail<input class="field" name="email" type="email" autocomplete="email" maxlength="254" required /></label><label class="form-label">Senha<input class="field" name="password" type="password" minlength="8" maxlength="128" autocomplete="current-password" placeholder="Pelo menos 8 caracteres" required /></label><fieldset class="signup-fields form-stack" data-signup-fields hidden disabled><label class="form-label">Seu nome<input class="field" name="name" type="text" autocomplete="name" minlength="2" maxlength="100" required /></label><label class="form-label">CPF<input class="field" name="cpf" type="text" inputmode="numeric" autocomplete="off" maxlength="14" placeholder="000.000.000-00" required /></label><label class="form-label">Data de nascimento<input class="field" name="birthDate" type="date" required /></label>${cepLookup(true, 'account')}</fieldset><button class="button button-primary" type="submit" data-account-submit>Entrar</button><p class="form-note" data-account-note role="status"></p></form></div></div></section></main>`;
  }

  function checkoutPage() {
    const items = cartProducts();
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
    if (!items.length) return `<main id="main-content"><section class="section"><div class="container"><div class="empty-state"><h2>Seu checkout está esperando.</h2><p>Adicione algum produto antes de continuar.</p><a class="button button-primary" href="/produtos">Ver produtos</a></div></div></section></main>`;
    return `<main id="main-content"><section class="page-heading"><div class="container"><span class="eyebrow">Checkout preparado</span><h1>Falta pouco para finalizar.</h1><p>Confira o endereço para registrar seu pedido. Esta etapa não realiza cobranças.</p></div></section><section class="section-tight"><div class="container account-layout"><div class="account-card"><form class="form-stack" data-checkout-form><div class="checkout-note">${getSession() ? 'O pedido será salvo na sua conta como simulado, sem cobrança.' : '<a href="/conta">Entre ou crie uma conta</a> para registrar seu pedido.'}</div><label class="form-label">Nome completo<input class="field" name="name" type="text" value="${escapeHtml(getSession()?.name || '')}" required /></label><label class="form-label">E-mail<input class="field" name="email" type="email" value="${escapeHtml(getSession()?.email || '')}" required /></label>${checkoutAddress()}<button class="button button-primary" type="submit">Registrar pedido simulado</button><p class="form-note" data-checkout-note></p></form></div><aside class="summary"><h2>Seu pedido</h2>${items.map(item => `<div class="summary-line"><span>${item.qty}× ${item.product.name}</span><strong>${money(item.product.price * item.qty)}</strong></div>`).join('')}${couponForm()}<div data-cart-totals>${cartTotals()}</div></aside></div></section></main>`;
  }

  function policyPage(page) {
    return `<main id="main-content"><section class="page-heading"><div class="container"><span class="eyebrow">${page.eyebrow}</span><h1>${page.title}</h1><p>${page.intro}</p></div></section><section class="container"><article class="prose">${page.sections.map(([heading, text]) => `<section><h2>${heading}</h2><p>${text}</p></section>`).join('')}${page.links ? `<nav class="legal-links" aria-label="Documentos da Compraê">${page.links.map(([href, title, description]) => `<a class="legal-link" href="${href}"><strong>${title}</strong><span>${description}</span><em aria-hidden="true">↗</em></a>`).join('')}</nav>` : ''}</article></section></main>`;
  }

  function profilePanel() {
    const session = getSession();
    const profile = getProfile();
    const name = profile.name || session?.name || 'Meu perfil';
    const photo = /^data:image\/jpeg;base64,[a-z0-9+/=]+$/i.test(profile.photo || '') || /^\/api\/me\/photo\?v=[a-z0-9]+$/i.test(profile.photo || '') ? profile.photo : '';
    const addresses = getSavedAddresses();
    const selected = Array.isArray(accountState.addresses) && session ? addresses.find(item => item.selected)?.id : localStorage.getItem(selectedAddressKey()) || addresses[0]?.id;
    return `<section class="profile-section"><div class="profile-heading"><span class="profile-avatar">${photo ? `<img src="${photo}" alt="Foto de perfil" />` : escapeHtml(name.charAt(0).toUpperCase())}</span><div><h2>${escapeHtml(name)}</h2><p>${session ? escapeHtml(session.email) : 'Seu perfil neste navegador'}</p></div></div><div class="profile-actions"><label class="button button-outline button-small" for="profile-photo">Escolher foto</label><input id="profile-photo" type="file" accept="image/png,image/jpeg,image/webp" data-profile-photo hidden />${photo ? '<button class="button button-outline button-small" type="button" data-profile-photo-remove>Remover foto</button>' : ''}</div><form class="profile-name-form" data-profile-name><label class="form-label">Nome exibido<input class="field" name="name" maxlength="100" value="${escapeHtml(profile.name || session?.name || '')}" placeholder="Como podemos chamar você?" required /></label><button class="button button-outline button-small" type="submit">Salvar nome</button></form><p class="profile-storage-note">${session && accountState.profile ? 'Foto, nome exibido e endereços ficam salvos na sua conta.' : 'Foto, nome exibido e endereços ficam salvos neste navegador.'}</p></section>
      <section class="profile-section"><div class="profile-section-head"><div><h2>Meus endereços</h2><p>Escolha qual endereço aparece no cabeçalho.</p></div><button class="button button-primary button-small" type="button" data-address-new>Adicionar endereço</button></div><div class="saved-addresses">${addresses.length ? addresses.map(item => `<article class="saved-address ${item.id === selected ? 'selected' : ''}"><div><strong>${escapeHtml(item.label)}</strong>${item.id === selected ? '<span class="address-current">Em uso</span>' : ''}<p>${escapeHtml([item.address.logradouro, item.address.number, item.address.complement].filter(Boolean).join(', ') || 'Endereço sem rua cadastrada')}<br>${escapeHtml([item.address.bairro, item.address.localidade, item.address.uf].filter(Boolean).join(' · '))} · CEP ${escapeHtml(item.address.cep)}</p></div><div class="address-actions">${item.id === selected ? '' : `<button type="button" data-address-select="${escapeHtml(item.id)}">Usar</button>`}<button type="button" data-address-edit="${escapeHtml(item.id)}">Editar</button>${!session || addresses.length > 1 ? `<button type="button" data-address-remove="${escapeHtml(item.id)}">Excluir</button>` : ''}</div></article>`).join('') : '<p>Você ainda não tem endereços salvos.</p>'}</div><form class="form-stack address-editor" data-address-form hidden><h3 data-address-form-title>Novo endereço</h3><label class="form-label">Nome do endereço<input class="field" name="label" maxlength="40" placeholder="Casa, trabalho…" required /></label>${checkoutAddress()}<div class="address-editor-actions"><button class="button button-primary" type="submit">Salvar endereço</button><button class="button button-outline" type="button" data-address-cancel>Cancelar</button></div><p class="form-note" data-address-note role="status"></p></form></section>`;
  }

  function sellerNav(section) {
    const items = [['dashboard', '▦', 'Visão geral'], ['anuncios', '▤', 'Meus anúncios'], ['novo', '+', 'Novo produto'], ['estoque', '□', 'Estoque'], ['empresa', '○', 'Minha empresa']];
    return `<nav class="seller-sections" aria-label="Central do vendedor">${items.map(([id, icon, label]) => `<a class="seller-nav-link ${section === id ? 'active' : ''}" href="/vendedor?secao=${id}" ${section === id ? 'aria-current="page"' : ''}><span aria-hidden="true">${icon}</span>${label}</a>`).join('')}</nav>`;
  }

  function sellerFrame(section, title, intro, content, action = '') {
    const company = getCompany();
    return `<main id="main-content" class="seller-app"><section class="page-heading seller-heading"><div class="container seller-page-head"><div><span class="eyebrow">Central do vendedor</span><h1>${title}</h1><p>${intro}</p><div class="seller-store"><span class="seller-avatar">${sellerPhoto(company.photo) ? `<img src="${sellerPhoto(company.photo)}" alt="" />` : escapeHtml(company.name.charAt(0))}</span><span><strong>${escapeHtml(company.name)}</strong><small>Sua loja</small></span></div></div>${action}</div></section><div class="container seller-content">${sellerNav(section)}${content}</div></main>`;
  }

  function sellerDashboardReal() {
    const items = getSellerProducts();
    const units = items.reduce((sum, item) => sum + Number(item.sales || 0), 0);
    const stock = items.reduce((sum, item) => sum + Number(item.stock || 0), 0);
    const metrics = [['Anúncios ativos', items.filter(item => item.status === 'Ativo' && item.stock > 0).length], ['Unidades em estoque', stock], ['Itens em pedidos simulados', units], ['Anúncios cadastrados', items.length]];
    const content = `<div class="metric-grid">${metrics.map(([label, value]) => `<article class="metric-card"><div><span>${label}</span><strong>${value}</strong></div></article>`).join('')}</div><article class="seller-panel seller-dashboard-list"><div class="panel-head"><div><span class="panel-kicker">Seus anúncios</span><h2>Produtos da sua loja</h2></div><a href="/vendedor?secao=anuncios">Gerenciar →</a></div>${items.length ? `<div class="seller-dashboard-items">${items.slice(0, 5).map(item => `<div><img src="${escapeHtml(item.image)}" alt="" /><span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.status)} · ${item.stock} em estoque</small></span><b>${money(item.price)}</b></div>`).join('')}</div>` : '<p>Você ainda não cadastrou produtos. Publique seu primeiro anúncio para vê-lo no catálogo.</p>'}</article>`;
    return sellerFrame('dashboard', 'Visão geral', `Acompanhe os anúncios de ${escapeHtml(getCompany().name)}.`, content, '<a class="button button-primary" href="/vendedor?secao=novo">+ Novo produto</a>');
  }

  function sellerPage() {
    const section = query().get('secao') || 'dashboard';
    return section === 'anuncios' ? sellerListingsReal() : section === 'novo' ? sellerProductFormReal() : section === 'estoque' ? sellerStockReal() : section === 'empresa' ? sellerCompanyReal() : sellerDashboardReal();
  }

  function sellerListingsReal() {
    const items = getSellerProducts();
    const rows = items.map(item => `<article class="listing-row"><img class="listing-thumb" src="${escapeHtml(item.image)}" alt="" /><div class="listing-main"><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.category)}</small></div><span class="listing-price">${money(item.price)}</span><span class="stock-chip ${item.stock < 5 ? 'low' : ''}">${item.stock} em estoque</span><span class="status-chip ${item.status === 'Ativo' ? 'active' : ''}">${escapeHtml(item.status)}</span><a class="button button-outline button-small" href="/vendedor?secao=novo&editar=${encodeURIComponent(item.id)}">Editar</a></article>`).join('');
    return sellerFrame('anuncios', 'Meus anúncios', 'Gerencie apenas os produtos da sua loja.', `<div class="seller-panel listing-panel"><div class="list-toolbar"><label class="seller-search"><span>⌕</span><input type="search" placeholder="Buscar anúncio" data-list-search /></label><span>${items.length} anúncios</span></div><div class="listing-head"><span>Produto</span><span>Preço</span><span>Estoque</span><span>Status</span><span></span></div><div data-listings>${rows || '<div class="empty-state"><h2>Nenhum anúncio ainda.</h2><p>Adicione seu primeiro produto.</p></div>'}</div></div>`, '<a class="button button-primary" href="/vendedor?secao=novo">+ Novo anúncio</a>');
  }

  function sellerProductFormReal() {
    const id = query().get('editar');
    const item = getSellerProducts().find(product => product.id === id);
    if (id && !item) return sellerFrame('novo', 'Anúncio não encontrado', 'Este produto não pertence à sua loja.', '<a class="button button-outline" href="/vendedor?secao=anuncios">Ver anúncios</a>');
    const value = item || { name: '', category: 'Casa', price: '', stock: '', status: 'Ativo', description: '', image: '' };
    const categories = ['Casa','Tecnologia','Bem-estar','Papelaria','Moda','Outros'];
    const content = `<form class="product-editor" data-product-form data-product-id="${escapeHtml(id || '')}"><div class="editor-main"><section class="seller-panel form-section"><div class="form-section-head"><span>01</span><div><h2>Informações do produto</h2><p>Conte o que você está vendendo.</p></div></div><div class="form-grid"><label class="form-label form-wide">Nome do produto<input class="field" name="name" maxlength="120" value="${escapeHtml(value.name)}" required /></label><label class="form-label">Categoria<select class="field" name="category">${categories.map(category => `<option ${value.category === category ? 'selected' : ''}>${category}</option>`).join('')}</select></label><label class="form-label">Status<select class="field" name="status"><option ${value.status === 'Ativo' ? 'selected' : ''}>Ativo</option><option ${value.status === 'Pausado' ? 'selected' : ''}>Pausado</option></select></label><label class="form-label form-wide">Descrição<textarea class="field" name="description" rows="6" maxlength="1200" required>${escapeHtml(value.description)}</textarea></label></div></section><section class="seller-panel form-section"><div class="form-section-head"><span>02</span><div><h2>Foto do produto</h2><p>Esta foto aparecerá no catálogo.</p></div></div><label class="photo-drop"><input type="file" accept="image/jpeg,image/png,image/webp" data-photo-input ${item ? '' : 'required'} /><strong>Escolher foto</strong><small>JPG, PNG ou WebP · até 5 MB</small></label><div class="photo-grid" data-photo-preview>${value.image ? `<img class="seller-photo-preview" src="${escapeHtml(value.image)}" alt="Foto atual do produto" />` : ''}</div><p class="form-note" data-photo-note>${item ? 'Foto atual salva. Escolha outra para substituir.' : 'Nenhuma foto selecionada.'}</p></section></div><aside class="editor-side"><section class="seller-panel form-section"><div class="form-section-head"><span>03</span><div><h2>Preço e estoque</h2></div></div><div class="form-stack"><label class="form-label">Preço de venda<div class="money-field"><span>R$</span><input class="field" name="price" type="number" min="0.01" step="0.01" value="${escapeHtml(value.price)}" required /></div></label><label class="form-label">Estoque disponível<input class="field" name="stock" type="number" min="0" step="1" value="${escapeHtml(value.stock)}" required /></label></div></section><section class="seller-panel publish-box"><h2>${id ? 'Atualizar anúncio' : 'Publicar anúncio'}</h2><p>Produtos ativos com estoque aparecem no catálogo e podem ser adicionados à sacola.</p><button class="button button-primary" type="submit">${id ? 'Salvar alterações' : 'Publicar produto'}</button><a class="button button-outline" href="/vendedor?secao=anuncios">Cancelar</a><p class="form-note" data-product-note role="status"></p></section></aside></form>`;
    return sellerFrame('novo', id ? 'Editar anúncio' : 'Adicionar produto', id ? `Atualize ${escapeHtml(value.name)}.` : 'Cadastre um produto para a sua loja.', content);
  }

  function sellerStockReal() {
    const items = getSellerProducts();
    const content = `<div class="stock-summary"><article><span>Itens em estoque</span><strong>${items.reduce((sum, item) => sum + Number(item.stock), 0)}</strong></article><article><span>Estoque baixo</span><strong>${items.filter(item => item.stock > 0 && item.stock < 5).length}</strong></article><article><span>Sem estoque</span><strong>${items.filter(item => item.stock === 0).length}</strong></article></div><div class="seller-panel stock-list">${items.length ? items.map(item => `<form class="stock-row" data-stock-form data-product-id="${escapeHtml(item.id)}"><img class="listing-thumb" src="${escapeHtml(item.image)}" alt="" /><div><strong>${escapeHtml(item.name)}</strong><small>${item.stock === 0 ? 'Sem estoque' : item.stock < 5 ? 'Estoque baixo' : 'Disponível'}</small></div><span class="current-stock"><strong>${item.stock}</strong> unidades</span><label><span>Adicionar</span><input class="field" name="amount" type="number" min="1" step="1" value="1" required /></label><button class="button button-outline button-small" type="submit">+ Acrescentar</button></form>`).join('') : '<div class="empty-state"><h2>Nenhum produto cadastrado.</h2><a class="button button-primary" href="/vendedor?secao=novo">Cadastrar produto</a></div>'}</div>`;
    return sellerFrame('estoque', 'Gerenciar estoque', 'Atualize a disponibilidade dos seus produtos.', content);
  }

  function sellerCompanyReal() {
    const company = getCompany();
    const photo = sellerPhoto(company.photo);
    const content = `<div class="company-layout"><form class="seller-panel company-form" data-company-form><div class="form-section-head"><span>01</span><div><h2>Dados da loja</h2><p>Dados usados para identificar seus anúncios.</p></div></div><div class="form-stack"><label class="form-label">Nome da loja<input class="field" name="name" maxlength="100" value="${escapeHtml(company.name)}" required /></label><label class="form-label">E-mail comercial<input class="field" name="email" type="email" value="${escapeHtml(company.email)}" required /></label><label class="form-label">Telefone com DDD<input class="field" name="phone" type="tel" value="${escapeHtml(company.phone)}" required /></label><label class="form-label">CNPJ <small>opcional</small><input class="field" name="cnpj" value="${escapeHtml(company.cnpj || '')}" inputmode="numeric" maxlength="18" data-cnpj /></label><label class="form-label">Descrição da loja<textarea class="field" name="description" rows="5" maxlength="600" placeholder="Conte o que sua loja oferece">${escapeHtml(company.description || '')}</textarea></label><label class="form-label">Foto de perfil da loja<input class="field" type="file" accept="image/jpeg,image/png,image/webp" data-seller-photo-input /></label><div class="seller-profile-photo-preview" data-seller-photo-preview ${photo ? '' : 'hidden'}>${photo ? `<img src="${photo}" alt="Foto atual da loja" />` : ''}</div>${photo ? '<button class="button button-outline button-small" type="button" data-seller-photo-remove>Remover foto</button>' : ''}<div class="company-actions"><button class="button button-primary" type="submit">Salvar dados</button><span class="form-note" data-company-note role="status"></span></div></div></form><aside class="seller-panel company-preview"><span class="panel-kicker">Sua loja</span><div class="company-logo">${photo ? `<img src="${photo}" alt="Foto da loja ${escapeHtml(company.name)}" />` : escapeHtml(company.name.charAt(0))}</div><h2>${escapeHtml(company.name)}</h2><p>${escapeHtml(company.description || 'Adicione uma descrição para apresentar sua loja.')}</p><small>${escapeHtml(company.email)}</small><hr /><span class="status-chip active">Perfil ativo</span></aside></div>`;
    return sellerFrame('empresa', 'Minha loja', 'Mantenha os dados da sua loja atualizados.', content);
  }

  function notFound() { return `<main id="main-content"><section class="section"><div class="container"><div class="empty-state"><span class="eyebrow">404</span><h2>Esta página pegou outro caminho.</h2><p>Volte para o início ou continue explorando os produtos.</p><a class="button button-primary" href="/">Voltar ao início</a></div></div></section></main>`; }

  function render() {
    document.querySelector('[data-delivery-dialog]')?.close();
    disposeCep();
    disposeCep = () => {};
    let currentPath = path();
    if (currentPath === '/vendedor' && !getSession()) {
      const loginRoute = `/conta?next=${encodeURIComponent('/vendedor' + window.location.search)}`;
      if (window.location.protocol === 'file:') { window.location.replace(routeUrl(loginRoute)); return; }
      history.replaceState({}, '', routeUrl(loginRoute));
      currentPath = '/conta';
    }
    if (currentPath === '/vendedor' && getSession() && !getCompany()) {
      const activationRoute = '/conta?ativar-vendedor=1';
      if (window.location.protocol === 'file:') { window.location.replace(routeUrl(activationRoute)); return; }
      history.replaceState({}, '', routeUrl(activationRoute));
      currentPath = '/conta';
    }
    const seller = currentPath === '/vendedor';
    let content = seller ? sellerPage() : currentPath === '/' ? home() : currentPath === '/produtos' ? productsPage() : currentPath === '/favoritos' ? favoritesPage() : currentPath === '/categorias' ? categoriesPage() : currentPath === '/carrinho' ? cartPage() : currentPath === '/conta' ? accountPage() : currentPath === '/checkout' ? checkoutPage() : currentPath === '/entrega' ? deliveryPage() : currentPath.startsWith('/produto/') ? detailPage(currentPath.split('/')[2]) : policyPages[currentPath] ? policyPage(policyPages[currentPath]) : notFound();
    app.innerHTML = `<div class="shell">${header()}${content}${footer()}</div>`;
    document.querySelectorAll('a[href^="/"]').forEach(link => {
      link.dataset.route = link.getAttribute('href');
      link.href = routeUrl(link.dataset.route);
    });
    bindEvents();
    bindCoupon();
    document.querySelectorAll('[data-cep-lookup]').forEach(root => bindCepLookup(root));
    animateContent();
  }

  function navigate(to) {
    if (window.location.protocol === 'file:') { window.location.assign(routeUrl(to)); return; }
    history.pushState({}, '', routeUrl(to));
    render();
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  function toast(message) { const current = document.querySelector('.toast'); if (current) current.remove(); const element = document.createElement('div'); element.className = 'toast'; element.textContent = message; document.body.appendChild(element); window.setTimeout(() => element.remove(), 2800); }
  function addToCart(id, quantity = 1) { const product = productById(id); if (!product) return toast('Produto indisponível.'); const cart = getCart(); const existing = cart.find(item => item.id === id); if (product.ownerId && (existing?.qty || 0) + quantity > product.stock) return toast('Quantidade indisponível no estoque.'); if (existing) existing.qty += quantity; else cart.push({ id, qty: quantity }); saveCart(cart); toast('Adicionado à sua sacola.'); render(); }
  function updateCart(id, delta) { const cart = getCart(); const item = cart.find(entry => entry.id === id); if (!item) return; const product = productById(id); if (delta > 0 && product?.ownerId && item.qty + delta > product.stock) return toast('Quantidade indisponível no estoque.'); item.qty += delta; saveCart(item.qty > 0 ? cart : cart.filter(entry => entry.id !== id)); render(); }

  function bindEvents() {
    document.querySelector('[data-theme-toggle]')?.addEventListener('click', event => {
      const dark = document.documentElement.dataset.theme !== 'dark';
      const animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (animate) {
        document.documentElement.classList.add('theme-switching');
        event.currentTarget.classList.remove('theme-toggle-turn');
        void event.currentTarget.offsetWidth;
        event.currentTarget.classList.add('theme-toggle-turn');
        window.clearTimeout(window.themeTransitionTimer);
        window.themeTransitionTimer = window.setTimeout(() => document.documentElement.classList.remove('theme-switching'), 550);
      }
      document.documentElement.dataset.theme = dark ? 'dark' : 'light';
      localStorage.setItem('comprae-theme', dark ? 'dark' : 'light');
      event.currentTarget.textContent = dark ? '☀' : '☾';
      event.currentTarget.setAttribute('aria-label', dark ? 'Ativar modo claro' : 'Ativar modo escuro');
      event.currentTarget.setAttribute('aria-pressed', String(dark));
      event.currentTarget.title = dark ? 'Modo claro' : 'Modo escuro';
    });
    document.querySelector('[data-profile-name]')?.addEventListener('submit', async event => {
      event.preventDefault();
      const name = String(new FormData(event.currentTarget).get('name') || '').trim();
      if (name.length < 2) return;
      try {
        if (getSession() && accountState.profile) accountState.profile = (await api('me/profile', 'PUT', { name })).profile;
        else localStorage.setItem(profileKey(), JSON.stringify({ ...getProfile(), name }));
        render(); toast('Nome exibido salvo.');
      } catch (error) { toast(error.message); }
    });
    document.querySelector('[data-profile-photo]')?.addEventListener('change', async event => {
      const file = event.currentTarget.files?.[0];
      if (!file) return;
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) { toast('Escolha uma imagem JPG, PNG ou WebP de até 5 MB.'); return; }
      try {
        const image = await createImageBitmap(file);
        const scale = Math.min(1, 256 / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(image.width * scale); canvas.height = Math.round(image.height * scale);
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        image.close();
        if (getSession() && accountState.profile) {
          const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', .82));
          const uploaded = await fetch(new URL('api/me/photo', siteRoot), { method: 'PUT', credentials: 'same-origin', headers: { 'Content-Type': 'image/jpeg' }, body: blob });
          const result = await uploaded.json();
          if (!uploaded.ok) throw new Error(result.error || 'Não foi possível salvar a foto.');
          accountState.profile = result.profile;
        } else localStorage.setItem(profileKey(), JSON.stringify({ ...getProfile(), photo: canvas.toDataURL('image/jpeg', .82) }));
        render(); toast('Foto de perfil salva.');
      } catch { toast('Não foi possível salvar a foto. Tente uma imagem menor.'); }
    });
    document.querySelector('[data-profile-photo-remove]')?.addEventListener('click', async () => {
      try {
        if (getSession() && accountState.profile) accountState.profile = (await api('me/photo', 'DELETE', {})).profile;
        else { const profile = getProfile(); delete profile.photo; localStorage.setItem(profileKey(), JSON.stringify(profile)); }
        render();
      } catch (error) { toast(error.message); }
    });
    const addressForm = document.querySelector('[data-address-form]');
    const editAddress = id => {
      const item = id ? getSavedAddresses().find(entry => entry.id === id) : null;
      addressForm.hidden = false;
      addressForm.dataset.editId = item?.id || '';
      addressForm.reset();
      addressForm.querySelector('[data-address-form-title]').textContent = item ? 'Editar endereço' : 'Novo endereço';
      addressForm.querySelector('[data-address-note]').textContent = '';
      if (item) { addressForm.elements.label.value = item.label; addressForm.querySelector('[data-cep-lookup]').useAddress(item.address); }
      addressForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      addressForm.elements.label.focus();
    };
    document.querySelector('[data-address-new]')?.addEventListener('click', () => editAddress());
    document.querySelectorAll('[data-address-edit]').forEach(button => button.addEventListener('click', () => editAddress(button.dataset.addressEdit)));
    document.querySelector('[data-address-cancel]')?.addEventListener('click', () => { addressForm.hidden = true; });
    document.querySelectorAll('[data-address-select]').forEach(button => button.addEventListener('click', async () => {
      const item = getSavedAddresses().find(entry => entry.id === button.dataset.addressSelect);
      if (!item) return;
      button.disabled = true;
      try {
        if (getSession() && Array.isArray(accountState.addresses)) {
          const result = await api(`me/addresses/${item.id}/select`, 'PUT', {});
          accountState.user = result.user; accountState.addresses = result.addresses;
          render(); toast('Endereço de entrega atualizado.'); return;
        }
        if (getSession() && backendReady) accountState.user = (await api('me/address', 'PUT', item.address)).user;
        else if (getSession()) { accountState.user.address = item.address; persistLocalUser(); }
        else localStorage.setItem('comprae-guest-delivery', JSON.stringify(item.address));
        localStorage.setItem(selectedAddressKey(), item.id);
        render(); toast('Endereço de entrega atualizado.');
      } catch (error) { toast(error.message); button.disabled = false; }
    }));
    document.querySelectorAll('[data-address-remove]').forEach(button => button.addEventListener('click', async () => {
      const addresses = getSavedAddresses();
      const remaining = addresses.filter(item => item.id !== button.dataset.addressRemove);
      if (getSession() && !remaining.length) return;
      const selected = localStorage.getItem(selectedAddressKey()) || addresses[0]?.id;
      try {
        if (getSession() && Array.isArray(accountState.addresses)) {
          const result = await api(`me/addresses/${button.dataset.addressRemove}`, 'DELETE', {});
          accountState.user = result.user; accountState.addresses = result.addresses;
          render(); toast('Endereço removido.'); return;
        }
        if (button.dataset.addressRemove === selected && remaining.length && getSession() && backendReady) accountState.user = (await api('me/address', 'PUT', remaining[0].address)).user;
        else if (button.dataset.addressRemove === selected && remaining.length && getSession()) { accountState.user.address = remaining[0].address; persistLocalUser(); }
        saveAddresses(remaining);
        if (button.dataset.addressRemove === selected) {
          if (remaining.length) localStorage.setItem(selectedAddressKey(), remaining[0].id);
          else localStorage.removeItem(selectedAddressKey());
          if (!getSession()) localStorage.setItem('comprae-guest-delivery', JSON.stringify(remaining[0]?.address || null));
        }
        render(); toast('Endereço removido.');
      } catch (error) { toast(error.message); }
    }));
    addressForm?.addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.currentTarget; const data = new FormData(form);
      const cep = String(data.get('cep') || '').replace(/\D/g, '');
      const note = form.querySelector('[data-address-note]');
      if (!/^\d{8}$/.test(cep)) { note.textContent = 'Informe um CEP com 8 números.'; return; }
      const address = { cep: `${cep.slice(0, 5)}-${cep.slice(5)}`, logradouro: String(data.get('street') || '').trim(), bairro: String(data.get('neighborhood') || '').trim(), localidade: String(data.get('city') || '').trim(), uf: String(data.get('state') || ''), number: String(data.get('number') || '').trim(), complement: String(data.get('complement') || '').trim() };
      const label = String(data.get('label') || '').trim();
      const addresses = getSavedAddresses();
      const existing = addresses.find(item => item.id === form.dataset.editId);
      const id = existing?.id || crypto.randomUUID();
      if (existing) Object.assign(existing, { label, address });
      else addresses.push({ id, label, address });
      const active = localStorage.getItem(selectedAddressKey()) || addresses[0]?.id;
      try {
        if (getSession() && Array.isArray(accountState.addresses)) {
          const endpoint = existing ? `me/addresses/${existing.id}` : 'me/addresses';
          const result = await api(endpoint, existing ? 'PUT' : 'POST', { label, address });
          accountState.addresses = result.addresses;
          if (result.user) accountState.user = result.user;
          render(); toast('Endereço salvo.'); return;
        }
        if (id === active && getSession() && backendReady) accountState.user = (await api('me/address', 'PUT', address)).user;
        else if (id === active && getSession()) { accountState.user.address = address; persistLocalUser(); }
        saveAddresses(addresses);
        if (!active) localStorage.setItem(selectedAddressKey(), id);
        if (!getSession() && (id === active || !active)) localStorage.setItem('comprae-guest-delivery', JSON.stringify(address));
        render(); toast('Endereço salvo.');
      } catch (error) { note.textContent = error.message; }
    });
    document.querySelectorAll('[data-delivery-open]').forEach(button => button.addEventListener('click', openDeliveryDialog));
    document.querySelectorAll('a[data-route]').forEach(link => link.addEventListener('click', event => { if (link.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); navigate(link.dataset.route); }));
    document.querySelector('[data-search]')?.addEventListener('submit', async event => {
      event.preventDefault();
      const value = String(new FormData(event.currentTarget).get('busca') || '').trim().slice(0, 120);
      if (value && getSession()) {
        try {
          if (backendReady) accountState.searches = (await api('searches', 'POST', { term: value })).searches;
          else {
            accountState.searches = [{ id: crypto.randomUUID(), term: value, createdAt: new Date().toISOString() }, ...accountState.searches].slice(0, 50);
            localStorage.setItem(localHistoryKey('searches', getSession().id), JSON.stringify(accountState.searches));
          }
        }
        catch (error) { toast(`Busca não salva: ${error.message}`); }
      }
      navigate(`/produtos${value ? `?busca=${encodeURIComponent(value)}` : ''}`);
    });
    document.querySelector('[data-menu]')?.addEventListener('click', () => { const nav = document.querySelector('.nav-links'); if (!nav) return; const open = nav.style.display === 'flex'; nav.style.display = open ? '' : 'flex'; nav.style.flexDirection = 'column'; nav.style.position = 'absolute'; nav.style.top = '100%'; nav.style.left = '0'; nav.style.right = '0'; nav.style.padding = '18px'; nav.style.background = 'var(--paper)'; nav.style.borderBottom = '1px solid var(--line)'; });
    document.querySelectorAll('[data-add]').forEach(button => button.addEventListener('click', () => { const quantity = Number(button.closest('.purchase')?.querySelector('[data-quantity] span')?.textContent || 1); addToCart(button.dataset.add, quantity); }));
    document.querySelectorAll('[data-qty]').forEach(button => button.addEventListener('click', () => { const span = button.parentElement.querySelector('span'); const current = Number(span.textContent); span.textContent = Math.max(1, button.dataset.qty === 'plus' ? current + 1 : current - 1); }));
    document.querySelectorAll('[data-favorite]').forEach(button => button.addEventListener('click', () => { const favorites = getFavorites(); const index = favorites.indexOf(button.dataset.favorite); if (index >= 0) favorites.splice(index, 1); else favorites.push(button.dataset.favorite); localStorage.setItem(favoriteKey(), JSON.stringify(favorites)); render(); }));
    document.querySelectorAll('[data-cart-qty]').forEach(button => button.addEventListener('click', () => updateCart(button.dataset.id, button.dataset.cartQty === 'plus' ? 1 : -1)));
    document.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => { saveCart(getCart().filter(item => item.id !== button.dataset.remove)); render(); toast('Item removido da sacola.'); }));
    document.querySelector('[data-filter-category]')?.addEventListener('change', event => { const params = new URLSearchParams(window.location.search); if (event.target.value === 'Todas') params.delete('categoria'); else params.set('categoria', event.target.value); navigate(`/produtos${params.toString() ? `?${params}` : ''}`); });
    document.querySelector('[data-filter-sort]')?.addEventListener('change', event => { const params = new URLSearchParams(window.location.search); if (event.target.value === 'relevancia') params.delete('ordem'); else params.set('ordem', event.target.value); navigate(`/produtos${params.toString() ? `?${params}` : ''}`); });
    document.querySelector('[data-newsletter]')?.addEventListener('submit', event => { event.preventDefault(); const note = document.querySelector('[data-newsletter-note]'); note.textContent = 'Cadastro demonstrativo realizado — a integração de envio ainda está pendente.'; event.currentTarget.reset(); });
    document.querySelectorAll('[data-tab]').forEach(button => button.addEventListener('click', () => {
      document.querySelectorAll('[data-tab]').forEach(tab => { tab.classList.toggle('active', tab === button); tab.setAttribute('aria-pressed', String(tab === button)); });
      const form = document.querySelector('[data-account-form]');
      const signup = button.dataset.tab === 'signup';
      form.dataset.mode = button.dataset.tab;
      const fields = form.querySelector('[data-signup-fields]');
      fields.hidden = !signup;
      fields.disabled = !signup;
      form.querySelector('[data-account-submit]').textContent = signup ? 'Criar conta' : 'Entrar';
      form.elements.password.autocomplete = signup ? 'new-password' : 'current-password';
      form.querySelector('[data-account-note]').textContent = '';
    }));
    document.querySelector('[data-account-form]')?.addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = new FormData(form);
      const email = String(data.get('email')).trim().toLowerCase();
      const note = form.querySelector('[data-account-note]');
      const button = form.querySelector('[data-account-submit]');
      const mode = form.dataset.mode;
      note.classList.add('error');
      button.disabled = true;
      try {
        const payload = { email, password: String(data.get('password') || '') };
        if (mode === 'signup') {
          const address = await form.querySelector('[data-cep-lookup]').lookup();
          if (!address || !form.isConnected || form.dataset.mode !== mode) return;
          payload.name = String(data.get('name')).trim();
          payload.cpf = String(data.get('cpf') || '').replace(/\D/g, '');
          payload.birthDate = String(data.get('birthDate') || '');
          if (!validCpf(payload.cpf)) throw new Error('Informe um CPF válido.');
          if (!validBirthDate(payload.birthDate)) throw new Error('Informe uma data de nascimento válida.');
          payload.address = address;
        }
        const guestCart = getCart(); const guestCoupon = getCouponCode(); const guestFavorites = getFavorites();
        accountState = backendReady ? await api(mode === 'signup' ? 'auth/register' : 'auth/login', 'POST', payload) : await localRegisterLogin(mode, payload);
        if (backendReady && accountState.sellerProfile) accountState.sellerProducts = (await api('seller/products')).products;
        const cart = getCart();
        for (const item of guestCart) {
          const existing = cart.find(entry => entry.id === item.id);
          if (existing) existing.qty = Math.min(99, existing.qty + item.qty);
          else cart.push(item);
        }
        saveCart(cart);
        localStorage.setItem(favoriteKey(), JSON.stringify([...new Set([...getFavorites(), ...guestFavorites]) ]));
        localStorage.removeItem('comprae-favorites');
        if (guestCoupon && !getCouponCode()) localStorage.setItem(`${cartKey()}-coupon`, guestCoupon); localStorage.removeItem('comprae-cart-coupon'); localStorage.removeItem('comprae-cart');
        orderRequestId = null;
        const next = new URLSearchParams(window.location.search).get('next') || '';
        navigate(/^\/vendedor(?:\?[^#]*)?$/.test(next) ? next : '/conta');
        toast('Você entrou na sua conta.');
      } catch (error) { note.textContent = error.message; }
      finally { button.disabled = false; }
    });
    document.querySelector('[data-logout]')?.addEventListener('click', async event => {
      event.currentTarget.disabled = true;
      try { if (backendReady) await api('auth/logout', 'POST', {}); else localStorage.removeItem(localSessionKey); accountState = { user: null, searches: [], orders: [] }; orderRequestId = null; navigate('/conta'); }
      catch (error) { toast(error.message); const button = document.querySelector('[data-logout]'); if (button) button.disabled = false; }
    });
    document.querySelector('[data-seller-start]')?.addEventListener('click', event => {
      event.currentTarget.hidden = true;
      const form = document.querySelector('[data-seller-activation]');
      form.hidden = false;
      form.elements.name.focus();
    });
    document.querySelectorAll('[data-seller-photo-input]').forEach(input => input.addEventListener('change', async event => {
      const file = event.target.files?.[0];
      const preview = event.target.closest('form').querySelector('[data-seller-photo-preview]');
      const note = event.target.closest('form').querySelector('[data-seller-note], [data-company-note]');
      if (!file) return;
      try {
        const photo = await imageFromFile(file);
        event.target.dataset.image = photo;
        event.target.dataset.remove = '0';
        preview.innerHTML = `<img src="${photo}" alt="Nova foto da loja" />`;
        preview.hidden = false;
        note.textContent = 'Foto pronta para salvar.';
      } catch (error) { event.target.value = ''; event.target.dataset.image = ''; note.textContent = error.message; }
    }));
    document.querySelector('[data-seller-photo-remove]')?.addEventListener('click', event => {
      const form = event.currentTarget.closest('form');
      const input = form.querySelector('[data-seller-photo-input]');
      input.value = '';
      input.dataset.image = '';
      input.dataset.remove = '1';
      const preview = form.querySelector('[data-seller-photo-preview]');
      preview.innerHTML = '';
      preview.hidden = true;
      event.currentTarget.hidden = true;
      form.querySelector('[data-company-note]').textContent = 'A foto será removida ao salvar.';
    });
    document.querySelector('[data-seller-activation]')?.addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.currentTarget;
      const note = form.querySelector('[data-seller-note]');
      const button = form.querySelector('button[type="submit"]');
      const data = new FormData(form);
      const payload = { name: String(data.get('name') || '').trim(), email: String(data.get('email') || '').trim(), phone: String(data.get('phone') || '').replace(/\D/g, ''), cnpj: String(data.get('cnpj') || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase(), description: String(data.get('description') || '').trim() };
      if (payload.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || !/^\d{10,11}$/.test(payload.phone) || (payload.cnpj && !/^[A-Z0-9]{14}$/.test(payload.cnpj))) { note.textContent = 'Confira o nome, e-mail, telefone e CNPJ da loja.'; return; }
      if (!getSession().hasIdentity) {
        payload.cpf = String(data.get('cpf') || '').replace(/\D/g, '');
        payload.birthDate = String(data.get('birthDate') || '');
        if (!validCpf(payload.cpf) || !validBirthDate(payload.birthDate)) { note.textContent = 'Informe um CPF e uma data de nascimento válidos.'; return; }
      }
      button.disabled = true;
      try {
        const photoInput = form.querySelector('[data-seller-photo-input]');
        payload.photo = photoInput.dataset.image || (photoInput.files?.[0] ? await imageFromFile(photoInput.files[0]) : '');
        if (backendReady) {
          const result = await api('seller/profile', 'POST', payload);
          accountState.sellerProfile = result.sellerProfile;
          accountState.user = result.user;
          accountState.sellerProducts = [];
        } else {
          if (payload.cpf) {
            const accounts = readLocalAccounts();
            if (accounts.some(account => account.cpf === payload.cpf && account.id !== getSession().id)) throw new Error('CPF já cadastrado neste navegador.');
            const account = accounts.find(item => item.id === getSession().id);
            account.cpf = payload.cpf; account.birthDate = payload.birthDate; saveLocalAccounts(accounts);
            accountState.user = localAccountView(account);
          }
          localStorage.setItem(sellerProfileKey(), JSON.stringify(payload));
        }
        navigate('/vendedor');
        toast('Perfil de vendedor ativado. Crie seu primeiro anúncio.');
      } catch (error) { note.textContent = error.message; button.disabled = false; }
    });
    document.querySelector('[data-clear-searches]')?.addEventListener('click', async () => {
      try { if (backendReady) accountState.searches = (await api('searches', 'DELETE', {})).searches; else { accountState.searches = []; localStorage.removeItem(localHistoryKey('searches', getSession().id)); } render(); }
      catch (error) { toast(error.message); }
    });
    document.querySelector('[data-checkout-form]')?.addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.currentTarget;
      const note = form.querySelector('[data-checkout-note]');
      if (!getSession()) { note.textContent = 'Entre na sua conta para registrar o pedido.'; return; }
      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      const data = new FormData(form);
      orderRequestId ||= crypto.randomUUID();
      try {
        const orderAddress = { cep: data.get('cep'), logradouro: data.get('street'), bairro: data.get('neighborhood'), localidade: data.get('city'), uf: data.get('state'), number: data.get('number'), complement: data.get('complement') };
        let result;
        if (backendReady) result = await api('orders', 'POST', { requestId: orderRequestId, couponCode: getCouponCode(), recipient: data.get('name'), items: getCart(), address: orderAddress });
        else {
          const quote = localCartQuote(getCart(), getCouponCode());
          result = { order: { id: crypto.randomUUID(), totalCents: quote.totalCents, subtotalCents: quote.subtotalCents, discountCents: quote.discountCents, coupon: quote.coupon, status: 'simulado', recipient: String(data.get('name')), address: orderAddress, createdAt: new Date().toISOString(), items: quote.items.map(item => ({ id: item.id, name: item.name, quantity: item.qty, unitPriceCents: item.price_cents })) } };
          accountState.user.address = orderAddress; persistLocalUser();
          localStorage.setItem(localHistoryKey('orders', getSession().id), JSON.stringify([result.order, ...accountState.orders]));
        }
        if (result.user) accountState.user = result.user;
        accountState.orders = [result.order, ...accountState.orders.filter(order => order.id !== result.order.id)];
        saveCart([]);
        orderRequestId = null;
        navigate('/conta');
        toast('Pedido salvo no histórico. Nenhuma cobrança foi realizada.');
      } catch (error) { note.textContent = error.message; note.classList.add('error'); button.disabled = false; }
    });
    document.querySelector('[data-list-search]')?.addEventListener('input', event => { const term = event.target.value.toLowerCase(); document.querySelectorAll('.listing-row').forEach(row => { row.hidden = !row.textContent.toLowerCase().includes(term); }); });
    document.querySelector('[data-photo-input]')?.addEventListener('change', async event => {
      const file = event.target.files?.[0];
      if (!file) return;
      try { const photo = await imageFromFile(file); event.target.dataset.image = photo; document.querySelector('[data-photo-preview]').innerHTML = `<img class="seller-photo-preview" src="${photo}" alt="Nova foto do produto" />`; document.querySelector('[data-photo-note]').textContent = 'Foto pronta para salvar.'; }
      catch (error) { event.target.value = ''; event.target.dataset.image = ''; document.querySelector('[data-photo-note]').textContent = error.message; }
    });
    document.querySelector('[data-product-form]')?.addEventListener('submit', async event => {
      event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); const existing = getSellerProducts().find(item => item.id === form.dataset.productId); const button = form.querySelector('button[type="submit"]'); const note = form.querySelector('[data-product-note]');
      const image = form.querySelector('[data-photo-input]').dataset.image || existing?.image;
      if (!image) { note.textContent = 'Selecione uma foto do produto.'; return; }
      const record = { name: String(data.get('name')).trim(), category: String(data.get('category')), price: Number(data.get('price')), stock: Number(data.get('stock')), status: String(data.get('status')), description: String(data.get('description')).trim(), image };
      button.disabled = true;
      try {
        if (backendReady) {
          const result = await api(existing ? `seller/products/${existing.id}` : 'seller/products', existing ? 'PUT' : 'POST', record);
          accountState.sellerProducts = [result.product, ...(accountState.sellerProducts || []).filter(item => item.id !== result.product.id)];
          marketProducts = (await api('catalog/products')).products;
        } else {
          const product = { ...record, id: existing?.id || `seller-${crypto.randomUUID()}`, ownerId: getSession().id, storeName: getCompany().name, sales: existing?.sales || 0 };
          marketProducts = [product, ...marketProducts.filter(item => item.id !== product.id)];
          saveMarketProducts();
        }
        navigate('/vendedor?secao=anuncios'); toast(existing ? 'Anúncio atualizado.' : 'Produto publicado no catálogo.');
      } catch (error) { note.textContent = error.message; button.disabled = false; }
    });
    document.querySelectorAll('[data-stock-form]').forEach(form => form.addEventListener('submit', async event => {
      event.preventDefault(); const amount = Number(new FormData(form).get('amount')); const item = getSellerProducts().find(product => product.id === form.dataset.productId); if (!item || !Number.isInteger(amount) || amount < 1) return; const button = form.querySelector('button'); button.disabled = true;
      try { if (backendReady) { const result = await api(`seller/products/${item.id}/stock`, 'PUT', { amount }); accountState.sellerProducts = accountState.sellerProducts.map(product => product.id === item.id ? result.product : product); marketProducts = (await api('catalog/products')).products; } else { item.stock += amount; if (item.status === 'Pausado') item.status = 'Ativo'; saveMarketProducts(); } render(); toast('Estoque atualizado.'); }
      catch (error) { toast(error.message); button.disabled = false; }
    }));
    document.querySelector('[data-company-form]')?.addEventListener('submit', async event => {
      event.preventDefault(); const form = event.currentTarget; const data = new FormData(form); const payload = { name: String(data.get('name')).trim(), email: String(data.get('email')).trim(), phone: String(data.get('phone')).replace(/\D/g, ''), cnpj: String(data.get('cnpj')).replace(/[^A-Za-z0-9]/g, '').toUpperCase(), description: String(data.get('description') || '').trim() }; const note = form.querySelector('[data-company-note]'); const button = form.querySelector('button[type="submit"]');
      if (payload.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || !/^\d{10,11}$/.test(payload.phone) || (payload.cnpj && !/^[A-Z0-9]{14}$/.test(payload.cnpj))) { note.textContent = 'Confira o nome, e-mail, telefone e CNPJ da loja.'; return; }
      button.disabled = true;
      try { const photoInput = form.querySelector('[data-seller-photo-input]'); payload.photo = photoInput.dataset.remove === '1' ? '' : photoInput.dataset.image || (photoInput.files?.[0] ? await imageFromFile(photoInput.files[0]) : getCompany().photo || ''); if (backendReady) { const result = await api('seller/profile', 'POST', payload); accountState.sellerProfile = result.sellerProfile; marketProducts = (await api('catalog/products')).products; } else { localStorage.setItem(sellerProfileKey(), JSON.stringify(payload)); } render(); toast('Perfil da loja salvo.'); }
      catch (error) { note.textContent = error.message; button.disabled = false; }
    });
    document.querySelector('[data-cnpj]')?.addEventListener('input', event => { const digits = event.target.value.replace(/\D/g, '').slice(0, 14); event.target.value = digits.replace(/^(\d{2})(\d)/, '$1.$2').replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3').replace(/\.(\d{3})(\d)/, '.$1/$2').replace(/(\d{4})(\d)/, '$1-$2'); });
  }

  window.addEventListener('popstate', render);
  async function initialize() {
    app.innerHTML = '<p class="container" role="status">Carregando a loja…</p>';
    if (window.location.protocol !== 'file:') {
      try { accountState = await api('me'); backendReady = true; } catch { backendReady = false; }
    }
    if (backendReady) {
      try { marketProducts = (await api('catalog/products')).products; } catch { marketProducts = []; }
      if (accountState.sellerProfile) {
        try { accountState.sellerProducts = (await api('seller/products')).products; } catch { accountState.sellerProducts = []; }
      }
    } else { restoreLocalSession(); marketProducts = readMarketProducts(); }
    render();
  }
  initialize();
})();
