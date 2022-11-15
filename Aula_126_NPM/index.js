// 2.    1.    0.
// major minor patch

// 2.1.1 - patch alterado significa que houve correção de bug, mas sem alteração de outras propriedades
// 2.2.0 - minor alterado significa que houve acréscimo de funcionalidade
// 3.0.0 - major que houve alteração de projeto e pode causar incompatibilidade.

// Quando usa ^ significa que pode alterar minor e patch
// Possível utilizar ~ para corrigir somente patch

// Instalar pacote mais atual: npm install <name package>
// Instalar pacote em versão específica: npm install <name package>@<version>
// Instalar pacote em versão específica mais atual e não permitir atualização (^ no webpackage.json): npm install <name package> -E
// Identificar versão: npm <name package> -v
// Atualizar pacotes: npm update
// Salvar como dependência de desenvolvedor: npm install <name package> --save-dev
// Salvar como dependência de produção: npm install <name package> --save-prod

// Desinstalar: npm uninstall <name package>

// Listar pacotes: npm ls
// Listar pacotes em nível de profundidade: npm ls --depth=1

// Listar pacotes desatualizados: npm outdated