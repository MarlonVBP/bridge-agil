document.addEventListener("DOMContentLoaded", () => {
    // Page Navigation
    const navItems = document.querySelectorAll('.sidebar-nav li');
    const pages = document.querySelectorAll('.page-content');

    function showPage(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        const target = document.getElementById(pageId);
        if (target) target.classList.add('active');
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            const targetPage = item.getAttribute('data-target');
            showPage(targetPage);
        });
    });

    // Go to Lançamentos from Dashboard
    const goToLancamentos = document.querySelector('.go-to-lancamentos');
    if (goToLancamentos) {
        goToLancamentos.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('li[data-target="lancamentos-page"]').click();
        });
    }

    // Modal logic
    const modal = document.getElementById('lancamento-modal');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal, .close-modal-btn');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('active');
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    });

    // Mock Data - Lançamentos
    const mockLancamentos = [
        { id: "001", data: "18/07/2026", obra: "Residencial Alfa", cat: "Materiais (Cimento, Areia)", valor: "R$ 4.500,00", valorNum: 4500.00, status: "Conferido" },
        { id: "002", data: "17/07/2026", obra: "Edifício Beta", cat: "Ferramentas", valor: "R$ 1.250,00", valorNum: 1250.00, status: "Falta Conferir" },
        { id: "003", data: "16/07/2026", obra: "Dividido (Várias Obras)", cat: "Aluguel de Máquinas", valor: "R$ 3.800,00", valorNum: 3800.00, status: "Conferido" },
        { id: "004", data: "16/07/2026", obra: "Condomínio Ômega", cat: "Serviços (Pedreiros)", valor: "R$ 8.900,00", valorNum: 8900.00, status: "Falta Conferir" },
        { id: "005", data: "15/07/2026", obra: "Vila Nova", cat: "Materiais (Pisos)", valor: "R$ 600,00", valorNum: 600.00, status: "Conferido" },
        { id: "006", data: "14/07/2026", obra: "Residencial Alfa", cat: "Ferramentas", valor: "R$ 350,00", valorNum: 350.00, status: "Conferido" },
        { id: "007", data: "13/07/2026", obra: "Edifício Beta", cat: "Aluguel de Máquinas", valor: "R$ 1.800,00", valorNum: 1800.00, status: "Falta Conferir" },
        { id: "008", data: "12/07/2026", obra: "Residencial Alfa", cat: "Serviços (Empreiteiros)", valor: "R$ 15.000,00", valorNum: 15000.00, status: "Conferido" }
    ];

    const lancamentosTable = document.getElementById('lancamentos-table-body');
    function renderLancamentos() {
        if(!lancamentosTable) return;
        lancamentosTable.innerHTML = '';
        mockLancamentos.forEach(lanc => {
            const statusClass = lanc.status === 'Conferido' ? 'success' : 'pending';
            lancamentosTable.innerHTML += `
                <tr>
                    <td>${lanc.id}</td>
                    <td>${lanc.data}</td>
                    <td>${lanc.obra}</td>
                    <td>${lanc.cat}</td>
                    <td>${lanc.valor}</td>
                    <td><span class="status-badge ${statusClass}">${lanc.status}</span></td>
                    <td>
                        <button class="action-btn edit-btn" title="Editar"><i class="fa-solid fa-pen"></i></button>
                        <button class="action-btn delete-btn" title="Excluir"><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>
            `;
        });
    }
    renderLancamentos();


    // Mock Data - Obras
    const obrasTable = document.getElementById('obras-table-body');
    const mockObras = [
        { nome: "Residencial Alfa", eng: "João (Mestre)", inicio: "10/01/2026", orcamento: "R$ 1.500.000,00", status: "Tocando Rápido" },
        { nome: "Edifício Beta", eng: "Maria", inicio: "15/03/2026", orcamento: "R$ 2.300.000,00", status: "No Ritmo Normal" },
        { nome: "Condomínio Ômega", eng: "Pedro", inicio: "01/06/2026", orcamento: "R$ 800.000,00", status: "Começando as Fundações" },
        { nome: "Vila Nova", eng: "João (Mestre)", inicio: "20/02/2025", orcamento: "R$ 3.000.000,00", status: "Fase de Acabamento" }
    ];

    function openObraDetails(obra) {
        navItems.forEach(nav => nav.classList.remove('active'));
        
        document.getElementById('detalhe-obra-nome').textContent = obra.nome;
        document.getElementById('detalhe-obra-orcamento').textContent = obra.orcamento;
        document.getElementById('detalhe-obra-mestre').textContent = obra.eng;
        document.getElementById('detalhe-obra-status').textContent = obra.status;

        const gastosDaObra = mockLancamentos.filter(l => l.obra === obra.nome);
        
        let total = 0;
        gastosDaObra.forEach(g => {
            total += g.valorNum;
        });
        
        const totalFormatted = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        document.getElementById('detalhe-obra-gasto').textContent = totalFormatted;

        const detalheGastosTable = document.getElementById('detalhe-obra-gastos-body');
        detalheGastosTable.innerHTML = '';
        
        if(gastosDaObra.length === 0) {
            detalheGastosTable.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px;">Nenhum gasto registrado para esta obra ainda.</td></tr>';
        } else {
            gastosDaObra.forEach(lanc => {
                const statusClass = lanc.status === 'Conferido' ? 'success' : 'pending';
                detalheGastosTable.innerHTML += `
                    <tr>
                        <td>${lanc.id}</td>
                        <td>${lanc.data}</td>
                        <td>${lanc.cat}</td>
                        <td>${lanc.valor}</td>
                        <td><span class="status-badge ${statusClass}">${lanc.status}</span></td>
                        <td>
                            <button class="action-btn edit-btn" title="Editar"><i class="fa-solid fa-pen"></i></button>
                            <button class="action-btn delete-btn" title="Excluir"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                `;
            });
        }

        showPage('obra-detalhe-page');
    }

    if(obrasTable) {
        mockObras.forEach((obra) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${obra.nome}</strong></td>
                <td>${obra.eng}</td>
                <td>${obra.inicio}</td>
                <td>${obra.orcamento}</td>
                <td><span class="status-badge pending" style="background-color:rgba(201, 186, 122, 0.2); color:#a89445;">${obra.status}</span></td>
                <td onclick="event.stopPropagation()">
                    <button class="action-btn edit-btn" title="Editar"><i class="fa-solid fa-pen"></i></button>
                    <button class="action-btn delete-btn" title="Excluir"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            tr.addEventListener('click', () => openObraDetails(obra));
            obrasTable.appendChild(tr);
        });
    }

    const btnVoltarObras = document.getElementById('btn-voltar-obras');
    if(btnVoltarObras) {
        btnVoltarObras.addEventListener('click', () => {
            document.querySelector('li[data-target="obras-page"]').click();
        });
    }

    // Handle Form Submit
    const saveBtn = document.getElementById('save-lancamento-btn');
    if(saveBtn) {
        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const data = document.getElementById('lanc-data').value.split('-').reverse().join('/');
            const obra = document.getElementById('lanc-obra').value;
            const cat = document.getElementById('lanc-cat').value;
            const valorRaw = document.getElementById('lanc-valor').value;

            if(!obra || !cat || !valorRaw) {
                alert('Opa! Faltou preencher algumas informações.');
                return;
            }

            const valorNum = parseFloat(valorRaw);
            const valorFormatado = "R$ " + valorNum.toFixed(2).replace('.', ',');

            const newLancamento = {
                id: "00" + (mockLancamentos.length + 1),
                data: data,
                obra: obra,
                cat: cat,
                valor: valorFormatado,
                valorNum: valorNum,
                status: "Falta Conferir"
            };

            mockLancamentos.unshift(newLancamento);
            renderLancamentos();
            renderDashboardTransactions(filtroObraDashboard ? filtroObraDashboard.value : "todas");
            
            modal.classList.remove('active');
            document.getElementById('lancamento-form').reset();
            
            alert('Gasto anotado com sucesso!');
            
            document.querySelector('li[data-target="lancamentos-page"]').click();
        });
    }

    // Mock Data - Extratos
    const extratosTable = document.getElementById("extratos-table-body");
    const mockExtratos = [
        { data: "18/07/2026", banco: "C6", desc: "PIX ENVIADO - CASA DOS MATERIAIS", valor: "- R$ 4.500,00", status: "Bateu com a Nota" },
        { data: "17/07/2026", banco: "Sicoob", desc: "TED - LOCADORA DE MAQUINAS", valor: "- R$ 3.800,00", status: "Bateu com a Nota" },
        { data: "17/07/2026", banco: "C6", desc: "COMPRA CARTAO - LOJA DO MECANICO", valor: "- R$ 1.250,00", status: "Falta a Nota Fiscal" },
        { data: "16/07/2026", banco: "C6", desc: "PIX ENVIADO - JOAO PEDREIRO", valor: "- R$ 8.900,00", status: "Falta a Nota Fiscal" },
        { data: "16/07/2026", banco: "Sicoob", desc: "TARIFA BANCARIA", valor: "- R$ 45,00", status: "Gasto do Próprio Banco" },
    ];

    function renderExtratos() {
        if (!extratosTable) return;
        extratosTable.innerHTML = "";
        mockExtratos.forEach(ext => {
            let statusClass = "pending";
            let icon = "<i class=\"fa-solid fa-triangle-exclamation\"></i>";
            if (ext.status === "Bateu com a Nota" || ext.status === "Gasto do Próprio Banco") {
                statusClass = "success";
                icon = "<i class=\"fa-solid fa-check\"></i>";
            }
            
            let bancoColor = ext.banco === "C6" ? "color: #1E1E1E;" : "color: #00ae9d;";

            extratosTable.innerHTML += `
                <tr>
                    <td>${ext.data}</td>
                    <td><strong style="${bancoColor}">${ext.banco}</strong></td>
                    <td>${ext.desc}</td>
                    <td style="color: #d32f2f; font-weight: 500;">${ext.valor}</td>
                    <td><span class="status-badge ${statusClass}">${icon} ${ext.status}</span></td>
                </tr>
            `;
        });
    }
    renderExtratos();

    // Dashboard Filter and Transactions
    const dashTransactionsBody = document.getElementById("dashboard-transactions-body");
    const filtroObraDashboard = document.getElementById("filtro-obra-dashboard");
    
    const chartGastos = document.getElementById('chart-gastos');
    const chartEquipe = document.getElementById('chart-equipe');

    const chartData = {
        "todas": {
            gastos: [
                { label: "R. Alfa", val: "R$ 45k", height: 80, color: "slate-blue-bg" },
                { label: "Ed. Beta", val: "R$ 32k", height: 65, color: "mustard-bg" },
                { label: "C. Ômega", val: "R$ 21k", height: 50, color: "mauve-bg" },
                { label: "V. Nova", val: "R$ 18k", height: 40, color: "slate-blue-bg" },
                { label: "T. Sul", val: "R$ 10k", height: 30, color: "mustard-bg" }
            ],
            equipe: [
                { label: "Pedreiros", val: "42", height: 90, color: "mustard-bg" },
                { label: "Serventes", val: "35", height: 70, color: "slate-blue-bg" },
                { label: "Carpint.", val: "18", height: 40, color: "mauve-bg" },
                { label: "Eletric.", val: "12", height: 30, color: "mustard-bg" },
                { label: "Mestres", val: "8", height: 20, color: "slate-blue-bg" }
            ]
        },
        "Residencial Alfa": {
            gastos: [
                { label: "Cimento", val: "R$ 15k", height: 80, color: "slate-blue-bg" },
                { label: "Serviços", val: "R$ 12k", height: 60, color: "mustard-bg" },
                { label: "Ferragens", val: "R$ 10k", height: 50, color: "mauve-bg" },
                { label: "Aluguéis", val: "R$ 5k", height: 30, color: "slate-blue-bg" },
                { label: "Transp.", val: "R$ 3k", height: 15, color: "mustard-bg" }
            ],
            equipe: [
                { label: "Pedreiros", val: "15", height: 90, color: "mustard-bg" },
                { label: "Serventes", val: "10", height: 60, color: "slate-blue-bg" },
                { label: "Carpint.", val: "4", height: 30, color: "mauve-bg" },
                { label: "Eletric.", val: "3", height: 25, color: "mustard-bg" },
                { label: "Mestres", val: "2", height: 15, color: "slate-blue-bg" }
            ]
        },
        "Edifício Beta": {
            gastos: [
                { label: "Máquinas", val: "R$ 10k", height: 85, color: "slate-blue-bg" },
                { label: "Cimento", val: "R$ 8k", height: 70, color: "mustard-bg" },
                { label: "Elétrica", val: "R$ 6k", height: 50, color: "mauve-bg" },
                { label: "Serviços", val: "R$ 5k", height: 40, color: "slate-blue-bg" },
                { label: "Outros", val: "R$ 3k", height: 20, color: "mustard-bg" }
            ],
            equipe: [
                { label: "Pedreiros", val: "12", height: 80, color: "mustard-bg" },
                { label: "Serventes", val: "10", height: 65, color: "slate-blue-bg" },
                { label: "Eletric.", val: "5", height: 40, color: "mauve-bg" },
                { label: "Carpint.", val: "4", height: 30, color: "mustard-bg" },
                { label: "Mestres", val: "1", height: 10, color: "slate-blue-bg" }
            ]
        },
        "Condomínio Ômega": {
            gastos: [
                { label: "Fundações", val: "R$ 12k", height: 90, color: "slate-blue-bg" },
                { label: "Terraplan.", val: "R$ 5k", height: 50, color: "mustard-bg" },
                { label: "Tapumes", val: "R$ 2.3k", height: 30, color: "mauve-bg" },
                { label: "Ferragens", val: "R$ 1k", height: 15, color: "slate-blue-bg" },
                { label: "Outros", val: "R$ 700", height: 10, color: "mustard-bg" }
            ],
            equipe: [
                { label: "Pedreiros", val: "8", height: 70, color: "mustard-bg" },
                { label: "Serventes", val: "6", height: 50, color: "slate-blue-bg" },
                { label: "Máquinas", val: "3", height: 30, color: "mauve-bg" },
                { label: "Eng.", val: "2", height: 20, color: "mustard-bg" },
                { label: "Mestres", val: "1", height: 10, color: "slate-blue-bg" }
            ]
        }
    };

    function renderDashboardTransactions(obraFiltro = "todas") {
        if(!dashTransactionsBody) return;
        dashTransactionsBody.innerHTML = "";
        
        let filtrados = mockLancamentos;
        if (obraFiltro !== "todas") {
            filtrados = mockLancamentos.filter(l => l.obra === obraFiltro);
        }

        // Show only up to 5 latest for dashboard
        filtrados.slice(0, 5).forEach(lanc => {
            const statusClass = lanc.status === "Conferido" ? "success" : "pending";
            dashTransactionsBody.innerHTML += `
                <tr>
                    <td>${lanc.data}</td>
                    <td>${lanc.obra}</td>
                    <td>${lanc.cat}</td>
                    <td>${lanc.valor}</td>
                    <td><span class="status-badge ${statusClass}">${lanc.status}</span></td>
                </tr>
            `;
        });

        if (filtrados.length === 0) {
            dashTransactionsBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 20px;">Nenhum gasto encontrado para esta obra.</td></tr>`;
        }

        // Render Charts dynamically based on selection
        if(chartGastos && chartEquipe) {
            let data = chartData[obraFiltro];
            if (!data) data = chartData["todas"]; // Fallback
            
            chartGastos.innerHTML = data.gastos.map(d => `
                <div class="bar-group"><div class="bar ${d.color}" style="height: ${d.height}%;"></div><span><strong>${d.val}</strong><br>${d.label}</span></div>
            `).join('');
            
            chartEquipe.innerHTML = data.equipe.map(d => `
                <div class="bar-group"><div class="bar ${d.color}" style="height: ${d.height}%;"></div><span><strong>${d.val}</strong><br>${d.label}</span></div>
            `).join('');
        }
    }

    if(filtroObraDashboard) {
        filtroObraDashboard.addEventListener("change", (e) => {
            renderDashboardTransactions(e.target.value);
        });
    }

    renderDashboardTransactions();

    // Mock Data - Funcionários
    const funcTable = document.getElementById('funcionarios-table-body');
    const mockFuncs = [
        { nome: "José Carlos", funcao: "Mestre de Obras", alocado: "Residencial Alfa", permissoes: "Ver tudo de Alfa e aprovar notas", img: "J" },
        { nome: "Marcos Paulo", funcao: "Pedreiro", alocado: "Residencial Alfa", permissoes: "Apenas lançar notas", img: "M" },
        { nome: "Ana Paula", funcao: "Engenheira", alocado: "Edifício Beta, Vila Nova", permissoes: "Ver tudo de Beta e Vila Nova", img: "A" },
        { nome: "Luizão", funcao: "Mestre de Obras", alocado: "Condomínio Ômega", permissoes: "Ver tudo de Ômega", img: "L" },
    ];

    function renderFuncionarios() {
        if (!funcTable) return;
        funcTable.innerHTML = '';
        mockFuncs.forEach(func => {
            funcTable.innerHTML += `
                <tr>
                    <td>
                        <div style="display:flex; align-items:center; gap: 8px;">
                            <div class="avatar" style="width:30px; height:30px; font-size:12px;">${func.img}</div>
                            <strong>${func.nome}</strong>
                        </div>
                    </td>
                    <td>${func.funcao}</td>
                    <td>${func.alocado}</td>
                    <td><span style="font-size: 12px; color: var(--text-secondary);"><i class="fa-solid fa-lock"></i> ${func.permissoes}</span></td>
                    <td>
                        <button class="action-btn edit-btn btn-edit-func" title="Editar Permissões" data-nome="${func.nome}"><i class="fa-solid fa-user-gear"></i></button>
                        <button class="action-btn delete-btn btn-del-func" title="Remover da Obra" data-nome="${func.nome}"><i class="fa-solid fa-user-minus"></i></button>
                    </td>
                </tr>
            `;
        });

        document.querySelectorAll(".btn-edit-func").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const nome = e.currentTarget.getAttribute("data-nome");
                const res = prompt("Ajustando permissões para " + nome + ". O que ele pode ver agora?", "Ver tudo");
                if(res) {
                    const f = mockFuncs.find(x => x.nome === nome);
                    if(f) f.permissoes = res;
                    renderFuncionarios();
                    alert("Permissões de " + nome + " atualizadas com sucesso!");
                }
            });
        });
        document.querySelectorAll(".btn-del-func").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const nome = e.currentTarget.getAttribute("data-nome");
                if(confirm("Tem certeza que deseja remover o acesso de " + nome + "? Ele não poderá mais acessar os dados da obra.")) {
                    const idx = mockFuncs.findIndex(x => x.nome === nome);
                    if(idx > -1) mockFuncs.splice(idx, 1);
                    renderFuncionarios();
                }
            });
        });
    }
    renderFuncionarios();

    // Mock Relatórios
    const btnGerarRelatorio = document.getElementById('btn-gerar-relatorio');
    const relatorioResultado = document.getElementById('relatorio-resultado');
    if (btnGerarRelatorio && relatorioResultado) {
        btnGerarRelatorio.addEventListener('click', () => {
            relatorioResultado.style.display = 'block';
            relatorioResultado.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Mock Print PDF
    const btnImprimir = document.getElementById("btn-imprimir-pdf");
    if(btnImprimir) {
        btnImprimir.addEventListener("click", () => {
            window.print();
        });
    }
});
