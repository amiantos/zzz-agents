document.addEventListener('DOMContentLoaded', function () {
    // Define the data model with images
    const agents = [
        { id: 'anby', name: 'Anby', image: 'images/anby.webp', rating: 75 },
        { id: 'anton', name: 'Anton', image: 'images/anton.webp', rating: 77 },
        { id: 'ben', name: 'Ben', image: 'images/ben.webp', rating: 70 },
        { id: 'ellen', name: 'Ellen', image: 'images/ellen.webp', rating: 97 },
        { id: 'grace', name: 'Grace', image: 'images/grace.webp', rating: 90 },
        { id: 'koleda', name: 'Koleda', image: 'images/koleda.webp', rating: 87 },
        { id: 'soldier11', name: 'Soldier 11', image: 'images/soldier-11.webp', rating: 92 },
        { id: 'lucy', name: 'Lucy', image: 'images/lucy.webp', rating: 86 },
        { id: 'lycaon', name: 'Lycaon', image: 'images/lycaon.webp', rating: 96 },
        { id: 'nekomata', name: 'Nekomata', image: 'images/nekomata.webp', rating: 91 },
        { id: 'nicole', name: 'Nicole', image: 'images/nicole.webp', rating: 73 },
        { id: 'piper', name: 'Piper', image: 'images/piper.webp', rating: 84 },
        { id: 'rina', name: 'Rina', image: 'images/rina.webp', rating: 93 },
        { id: 'soukaku', name: 'Soukaku', image: 'images/soukaku.webp', rating: 94 },
        { id: 'zhuyuan', name: 'Zhu Yuan', image: 'images/zhu-yuan.webp', rating: 95 },
        { id: 'billy', name: 'Billy', image: 'images/billy.webp', rating: 69 },
        { id: 'corin', name: 'Corin', image: 'images/corin.webp', rating: 65 },
        { id: 'qingyi', name: 'Qingyi', image: 'images/qingyi.png', rating: 95 },
    ];

    const teams = [
        { id: 'starter', agents: ['anby', 'nicole', 'billy'], element: '', name: 'F2P Starter' },

        { id: 'cunning-hares-team', agents: ['nekomata', 'anby', 'nicole'], element: '', name: 'Cunning Hares'},
        { id: 'victoria-team', agents: ['ellen', 'rina', 'lycaon'], element: '', name: 'Victoria Housekeeping'},
        { id: 'belobog', agents: ['anton', 'koleda', 'ben'], element: '', name: 'Belobog' },

        { id: 'physical-g8', agents: ['nekomata', 'piper', 'lucy'], element: 'physical', name: 'Physical Premium' },
        { id: 'ice-g8', agents: ['ellen', 'soukaku', 'lycaon'], element: 'ice', name: 'Ice Premium'},
        { id: 'electric-g8', agents: ['anton', 'grace', 'rina'], element: 'electric', name: 'Electric Premium' },
        { id: 'ether-g8', agents: ['zhuyuan', 'qingyi', 'nicole'], element: 'ether', name: 'Ether Premium' },
        { id: 'fire-g8', agents: ['soldier11', 'koleda', 'lucy'], element: 'fire', name: 'Fire Premium'},

        { id: 'ellen-f2p-g8', agents: ['ellen', 'anby', 'soukaku'], element: '', name: 'Ellen F2P'},
        { id: 'zhuyuan-f2p-g8', agents: ['zhuyuan', 'anby', 'nicole'], element: '', name: 'Zhu Yuan F2P'},
        { id: 'zhuyuan-premium-g8', agents: ['zhuyuan', 'lycaon', 'rina'], element: '', name: 'Zhu Yuan Premium'},
        { id: 'lycaon-f2p-g8', agents: ['corin', 'lycaon', 'soukaku'], element: '', name: 'Lycaon F2P'},
        { id: 'qingyi-f2p-g8', agents: ['billy', 'qingyi', 'nicole'], element: '', name: 'Qingyi F2P'},
        { id: 'qingyi-electric-g8', agents: ['anton', 'qingyi', 'rina'], element: '', name: 'Qingyi Premium'},
        { id: 'soukaku-f2p-g8', agents: ['billy', 'anby', 'soukaku'], element: '', name: 'Soukaku F2P'},
        { id: 'rina-f2p-g8', agents: ['billy', 'anby', 'rina'], element: '', name: 'Rina F2P'},
        { id: 'grace-f2p-g8', agents: ['grace', 'anby', 'soukaku'], element: '', name: 'Grace F2P'},
        { id: 'koleda-premium-g8', agents: ['soldier11', 'koleda', 'ben'], element: '', name: 'Koleda Premium'},
        { id: 'koleda-f2p-g8', agents: ['corin', 'koleda', 'ben'], element: '', name: 'Koleda F2P'},
        { id: 'lucy-f2p-g8', agents: ['soldier11', 'ben', 'lucy'], element: '', name: 'Lucy semi-F2P'},
        { id: 'nekomata-premium-g8', agents: ['nekomata', 'lycaon', 'nicole'], element: '', name: 'Nekomata Premium'},
        { id: 'soldier11-f2p-g8', agents: ['soldier11', 'ben', 'nicole'], element: '', name: 'Soldier 11 F2P'},
        { id: 'anby-premium-g8', agents: ['anton', 'anby', 'grace'], element: '', name: 'Anby Premium'},
        { id: 'piper-f2p-g8', agents: ['piper', 'anby', 'nicole'], element: '', name: 'Piper F2P'},
        { id: 'anton-f2p-g8', agents: ['anton', 'anby', 'nicole'], element: '', name: 'Anton F2P' },
        { id: 'anton-premium-g8', agents: ['anton', 'qingyi', 'grace'], element: '', name: 'Anton Premium' },
        { id: 'corin-f2p-g8', agents: ['corin', 'billy', 'anby'], element: '', name: 'Corin F2P' },
        { id: 'corin-premium-g8', agents: ['corin', 'lycaon', 'rina'], element: '', name: 'Corin Premium' },
        { id: 'billy-premium-g8', agents: ['billy', 'lycaon', 'nicole'], element: '', name: 'Billy Premium' },

    ];
    const selectedAgents = new Set();
    const agentList = document.getElementById('agentList');
    const teamGrid = document.getElementById('teamGrid');
    const suggestedAgentEl = document.getElementById('suggestedAgent');

    // sort agents by agent.name
    agents.sort((a, b) => a.name.localeCompare(b.name));

    // Generate the agent list dynamically as cards
    agents.forEach(agent => {
        const agentCard = document.createElement('li');
        agentCard.className = 'agent-card';
        agentCard.setAttribute('data-agent', agent.id);

        const agentImage = document.createElement('img');
        agentImage.src = agent.image;
        agentImage.alt = agent.name;

        const agentName = document.createElement('div');
        agentName.className = 'agent-name';
        agentName.textContent = agent.name;

        const agentRating = document.createElement('div');
        agentRating.className = 'agent-rating';
        agentRating.textContent = `Rating: ${agent.rating}`;

        agentCard.appendChild(agentImage);
        agentCard.appendChild(agentName);
        agentCard.appendChild(agentRating);
        agentList.appendChild(agentCard);

        // Add event listener for selecting/deselecting agents
        agentCard.addEventListener('click', function () {
            if (selectedAgents.has(agent.id)) {
                selectedAgents.delete(agent.id);
                agentCard.classList.remove('agent-card-selected');
            } else {
                selectedAgents.add(agent.id);
                agentCard.classList.add('agent-card-selected');
            }

            updateTeamHighlights();
            updateSuggestions();
            updateURLWithSelectedAgents();
        });
    });

    teams.forEach(team => {
        // avg_rating var is average rating of agents on team
        const avg_rating = Math.round(team.agents.reduce((acc, agent) => {
            return acc + agents.find(a => a.id === agent).rating;
        }, 0) / team.agents.length);

        team.rating = avg_rating;
    });

    // order teams by team.rating
    teams.sort((a, b) => b.rating - a.rating);

    // Generate the team grid dynamically with images
    teams.forEach(team => {
        const teamCell = document.createElement('div');
        teamCell.className = 'team-cell';
        teamCell.setAttribute('data-team', team.id);

        const metaContainer = document.createElement('div');
        metaContainer.className = 'meta-container';
        teamCell.appendChild(metaContainer);
    
        // Add team name and element at the top of the teamCell
        const teamName = document.createElement('div');
        teamName.className = 'team-name';
        teamName.textContent = `${team.name}`;
        metaContainer.appendChild(teamName);

        // Add team rating at the top of the teamCell
        const teamRating = document.createElement('div');
        teamRating.className = 'team-rating';
        teamRating.textContent = `Avg Rating: ${team.rating}`;
        metaContainer.appendChild(teamRating);

        // Sort agents alphabetically by name before generating elements
        const sortedAgents = team.agents.slice().sort((a, b) => {
            const agentA = agents.find(agent => agent.id === a).name.toLowerCase();
            const agentB = agents.find(agent => agent.id === b).name.toLowerCase();
            return agentA.localeCompare(agentB);
        });

        // Generate agent elements within the team cell
        sortedAgents.forEach(agentId => {
            const agentElement = document.createElement('div');
            agentElement.className = 'agent';
            agentElement.setAttribute('data-agent', agentId);
    
            const agentData = agents.find(agent => agent.id === agentId);
    
            if (agentData && agentData.image) {
                const img = document.createElement('img');
                img.src = agentData.image;
                img.alt = agentData.name;
                // img.style.width = '100%';
                img.style.height = '100%';
                agentElement.appendChild(img);
            } else {
                agentElement.textContent = agentData ? agentData.name : 'Unknown';
            }
    
            teamCell.appendChild(agentElement);
        });
    
        teamGrid.appendChild(teamCell);
    });

    // Functionality for URL management, team highlighting, and suggestions remains the same
    loadSelectedAgentsFromURL();

    function updateTeamHighlights() {
        teams.forEach(team => {
            const teamCell = document.querySelector(`[data-team="${team.id}"]`);
            let allAgentsSelected = true;

            team.agents.forEach(agent => {
                const agentElement = document.querySelector(`[data-team="${team.id}"] [data-agent="${agent}"]`);
                
                if (selectedAgents.has(agent)) {
                    agentElement.classList.add('highlight');
                } else {
                    agentElement.classList.remove('highlight');
                    allAgentsSelected = false;
                }
            });

            if (allAgentsSelected) {
                teamCell.classList.add('highlight-complete');
            } else {
                teamCell.classList.remove('highlight-complete');
            }
        });
    }

    function updateSuggestions() {
        const agentCounts = {};
    
        teams.forEach(team => {
            const missingAgents = team.agents.filter(agent => !selectedAgents.has(agent));
            if (missingAgents.length === 1) {
                const agent = missingAgents[0];
                if (!agentCounts[agent]) {
                    agentCounts[agent] = { count: 0, teams: [] };
                }
                agentCounts[agent].count += 1;
                agentCounts[agent].teams.push(team);
            }
        });
    
        const sortedAgents = Object.entries(agentCounts)
            .sort((a, b) => b[1].count - a[1].count)
            .map(([agent, data]) => {
                // const teamList = data.teams.join(', ');
                // build teamList var as comma separated list of data.teams.team.name
                const teamList = data.teams
                    .sort((a, b) => b.rating - a.rating)
                    .map(team => {
                        return `${team.name} (${team.rating})`;
                    })
                    .join(', ');
                return `${agents.find(a => a.id === agent).name} can complete ${data.count} team(s): ${teamList}`;
            });
    
        if (sortedAgents.length > 0) {
            suggestedAgentEl.innerHTML = `<ol>${sortedAgents.map(agent => `<li>${agent}</li>`).join('')}</ol>`;
        } else {
            suggestedAgentEl.textContent = 'No suggestions available.';
        }
    }

    function updateURLWithSelectedAgents() {
        const selectedAgentsArray = Array.from(selectedAgents);
        const agentString = selectedAgentsArray.join(',');
        const encodedAgentString = btoa(agentString);
        const url = new URL(window.location.href);
        url.searchParams.set('agents', encodedAgentString);
        window.history.replaceState({}, '', url);
    }

    function loadSelectedAgentsFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const encodedAgentsFromURL = urlParams.get('agents');
        if (encodedAgentsFromURL) {
            const decodedAgentString = atob(encodedAgentsFromURL);
            const agentsArray = decodedAgentString.split(',');
            agentsArray.forEach(agent => {
                selectedAgents.add(agent);
                const agentCard = document.querySelector(`[data-agent="${agent}"]`);
                if (agentCard) {
                    agentCard.classList.add('agent-card-selected');
                }
            });
            updateTeamHighlights();
            updateSuggestions();
        }
    }
});