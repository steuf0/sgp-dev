export const environment: any = {
  email: 'sthefanog@gmail.com',
  available_languages: [
    { acro: 'pt', name: 'Português', image: '🇧🇷' },
    { acro: 'en', name: 'English', image: '🇬🇧' },
  ],
  resume: {
    pt: 'assets/files/Resume-PTBR.pdf',
    en: 'assets/files/Resume-EN.pdf',
  },
  links: {
    repository: 'https://github.com/steuf0/spg-dev',
    linkedin: 'https://www.linkedin.com/in/sthefanogarcia/',
    github: 'https://github.com/steuf0',
  },
  work_history: [
    {
      company: 'Paytime Fintech',
      role: 'Desenvolvedor front-end',
      period: 'Abril 2022 - Janeiro 2023',
      link: 'https://www.paytime.com.br',
      total_time: '11 meses',
      details: {
        0: 'Responsável pelo desenvolvimento do site, portal de clientes e ecommerce da Paytime, utilizados por mais de <b class="text-blue-light">70.000 clientes</b> e transacionando mais de <b class="text-blue-light">R$ 5 bilhões</b> anualmente',
        1: 'Fui exposto ao Angular 12 durante minha ocupação e o usei como a framework principal para a maioria dos projetos dentro da Paytime',
        2: 'Defendi e ajudei a estabelecer boas práticas dentro da equipe de engenharia, o que trouxe benefícios para a estabilidade do produto e higiene do código',
        3: 'Sendo proativo e trazendo contribuições técnicas que melhoraram a experiência geral na Paytime, rapidamente fui contratado em tempo integral após apenas 3 meses de estágio',
        4: 'Revisão, análise e refatoração de código',
        5: 'Trabalhei em colaboração com outras equipes para oferecer a melhor experiência de usuário possível',
      },
    },
  ],
};
