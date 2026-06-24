export const TRACKS = [
  {
    id: 'linux',
    name: 'Enterprise Linux',
    desc: 'System administration, infrastructure engineering, and RHEL operations',
    color: '#111111',
    rhcaRequirement: { required: ['EX200','EX342'], electivesNeeded: 3 },
    levels: [
      {
        label: 'Foundation',
        certs: [
          { code: 'EX200', name: 'Red Hat Certified System Administrator (RHCSA)', level: 2, type: 'required', credential: 'RHCSA', prereqs: [], duration: '2.5 hours', version: 'RHEL 9', desc: 'Validates core Linux administration skills: user/group management, storage configuration, networking, service management, SELinux, and containers. The foundational credential for all Enterprise Linux and Ansible tracks.', url: 'https://www.redhat.com/en/services/training/ex200-red-hat-certified-system-administrator-rhcsa-exam' },
        ],
      },
      {
        label: 'Engineer',
        certs: [
          { code: 'EX342', name: 'Red Hat Certified Advanced System Administrator in Enterprise Linux', level: 3, type: 'required', credential: 'RHCE — Enterprise Linux', prereqs: ['EX200'], duration: '3.5 hours', version: 'RHEL 9', desc: 'Validates advanced Linux system administration: performance tuning, storage management, network services, kernel management, and troubleshooting complex enterprise Linux environments.', url: 'https://www.redhat.com/en/services/training/ex342-red-hat-certified-advanced-system-administrator-enterprise-linux-exam' },
        ],
      },
      {
        label: 'Specialist Electives (choose 3 for RHCA)',
        sublabel: 'Choose any 3 of the following to qualify for RHCA in Enterprise Linux',
        certs: [
          { code: 'EX210', name: 'Red Hat Certified Specialist in Cloud Infrastructure', level: 4, type: 'elective', credential: 'RHCS in Cloud Infrastructure', prereqs: ['EX200'], duration: '3 hours', version: 'RHOSP 17', desc: 'Tests the ability to deploy and manage cloud infrastructure using Red Hat OpenStack Platform, including networking, storage, compute resources, and tenant management.', url: 'https://www.redhat.com/en/services/training/ex210-red-hat-certified-specialist-cloud-infrastructure-exam' },
          { code: 'EX260', name: 'Red Hat Certified Specialist in Ceph Cloud Storage', level: 4, type: 'elective', credential: 'RHCS in Ceph Cloud Storage', prereqs: ['EX200'], duration: '3 hours', version: 'RHCS 5', desc: 'Validates skills in deploying, configuring, and managing Red Hat Ceph Storage clusters, including object, block, and file storage, as well as monitoring and troubleshooting.', url: 'https://www.redhat.com/en/services/training/ex260-red-hat-certified-specialist-ceph-cloud-storage-exam' },
          { code: 'EX358', name: 'Red Hat Certified Specialist in Services Management and Automation', level: 4, type: 'elective', credential: 'RHCS in Services Management and Automation', prereqs: ['EX200'], duration: '3 hours', version: 'RHEL 9', desc: 'Tests the ability to configure and manage key network services (DNS, DHCP, NFS, Samba, HTTP, iSCSI) and automate their deployment using shell scripting and Ansible.', url: 'https://www.redhat.com/en/services/training/ex358-red-hat-certified-specialist-services-management-automation-exam' },
          { code: 'EX362', name: 'Red Hat Certified Specialist in Identity Management', level: 4, type: 'elective', credential: 'RHCS in Identity Management', prereqs: ['EX200'], duration: '3 hours', version: 'RHEL 9', desc: 'Validates skills in deploying and managing Red Hat Identity Management (IdM/FreeIPA), including Kerberos authentication, certificate management, DNS integration, and trust relationships with Active Directory.', url: 'https://www.redhat.com/en/services/training/ex362-red-hat-certified-specialist-identity-management-exam' },
          { code: 'EX403', name: 'Red Hat Certified Specialist in Deployment and Systems Management', level: 4, type: 'elective', credential: 'RHCS in Deployment and Systems Management', prereqs: ['EX200'], duration: '3 hours', version: 'Satellite 6', desc: 'Tests the ability to deploy and manage Red Hat Satellite for large-scale RHEL lifecycle management, including content management, provisioning, configuration management, and patch orchestration.', url: 'https://www.redhat.com/en/services/training/ex403-red-hat-certified-specialist-deployment-systems-management-exam' },
          { code: 'EX415', name: 'Red Hat Certified Specialist in Security: Linux', level: 4, type: 'elective', credential: 'RHCS in Security: Linux', prereqs: ['EX200'], duration: '3 hours', version: 'RHEL 9', desc: 'Validates skills in securing Red Hat Enterprise Linux systems, including auditing, encryption, logging, and security compliance using OpenSCAP.', url: 'https://www.redhat.com/en/services/training/ex415-red-hat-certified-specialist-security-linux-exam' },
          { code: 'EX436', name: 'Red Hat Certified Specialist in High Availability Clustering', level: 4, type: 'elective', credential: 'RHCS in High Availability Clustering', prereqs: ['EX200'], duration: '3 hours', version: 'RHEL 9', desc: 'Tests the ability to implement and manage high-availability services using the Red Hat High Availability Add-on (Pacemaker/Corosync).', url: 'https://www.redhat.com/en/services/training/ex436-red-hat-certified-specialist-high-availability-clustering-exam' },
          { code: 'EX442', name: 'Red Hat Certified Specialist in Linux Performance Tuning', level: 4, type: 'elective', credential: 'RHCS in Linux Performance Tuning', prereqs: ['EX200'], duration: '3 hours', version: 'RHEL 9', desc: 'Validates skills in monitoring, analyzing, and tuning the performance of Red Hat Enterprise Linux systems across various workloads.', url: 'https://www.redhat.com/en/services/training/ex442-red-hat-certified-specialist-linux-performance-tuning-exam' },
        ],
      },
      {
        label: 'Architect',
        certs: [
          { code: 'RHCA-EL', name: 'Red Hat Certified Architect in Enterprise Linux', level: 5, type: 'architect', credential: 'RHCA', prereqs: ['EX342'], duration: 'Portfolio', version: '—', desc: 'The highest level of certification, awarded to RHCEs who have passed at least 5 specialist exams from the Enterprise Linux concentration.', url: 'https://www.redhat.com/en/services/certifications/architect' },
        ],
      },
    ],
  },
  {
    id: 'ansible',
    name: 'Ansible Automation',
    desc: 'Automation engineering, infrastructure-as-code, and Ansible Automation Platform',
    color: '#1a73e8',
    rhcaRequirement: { required: ['EX200','EX294'], electivesNeeded: 3 },
    levels: [
      {
        label: 'Foundation',
        certs: [
          { code: 'EX200', name: 'Red Hat Certified System Administrator (RHCSA)', level: 2, type: 'required', credential: 'RHCSA', prereqs: [], duration: '2.5 hours', version: 'RHEL 9', desc: 'Foundation for Ansible track. Required before RHCE.', url: 'https://www.redhat.com/en/services/training/ex200-red-hat-certified-system-administrator-rhcsa-exam' },
        ],
      },
      {
        label: 'Engineer',
        certs: [
          { code: 'EX294', name: 'Red Hat Certified Advanced System Administrator in Ansible', level: 3, type: 'required', credential: 'RHCE — Ansible', prereqs: ['EX200'], duration: '3 hours', version: 'AAP 2', desc: 'Validates the ability to use Ansible to automate system administration tasks across multiple systems, including playbook development, roles, and AAP integration.', url: 'https://www.redhat.com/en/services/training/ex294-red-hat-certified-engineer-ansible-automation-exam' },
        ],
      },
      {
        label: 'Specialist Electives (choose 3 for RHCA)',
        certs: [
          { code: 'EX374', name: 'Red Hat Certified Specialist in Developing Automation with Ansible Automation Platform', level: 4, type: 'elective', credential: 'RHCS in Developing Automation with AAP', prereqs: ['EX294'], duration: '3 hours', version: 'AAP 2', desc: 'Tests advanced automation development: execution environments, automation controller API, and complex workflow orchestration.', url: 'https://www.redhat.com/en/services/training/ex374-red-hat-certified-specialist-developing-automation-ansible-automation-platform-exam' },
          { code: 'EX417', name: 'Red Hat Certified Specialist in Microsoft Windows Automation with Ansible', level: 4, type: 'elective', credential: 'RHCS in Microsoft Windows Automation with Ansible', prereqs: ['EX294'], duration: '3 hours', version: 'AAP 2 / WS2022', desc: 'Validates skills in using Ansible to automate Windows Server administration, including WinRM, Active Directory, and IIS.', url: 'https://www.redhat.com/en/services/training/ex417-red-hat-certified-specialist-microsoft-windows-automation-ansible-exam' },
          { code: 'EX457', name: 'Red Hat Certified Specialist in Ansible Network Automation', level: 4, type: 'elective', credential: 'RHCS in Ansible Network Automation', prereqs: ['EX294'], duration: '3 hours', version: 'AAP 2', desc: 'Tests the ability to use Ansible to automate network device configuration and management across various vendors (Cisco, Arista, Juniper).', url: 'https://www.redhat.com/en/services/training/ex457-red-hat-certified-specialist-ansible-network-automation-exam' },
          { code: 'EX467', name: 'Red Hat Certified Specialist in Managing Automation with Ansible Automation Platform', level: 4, type: 'elective', credential: 'RHCS in Managing Automation with AAP', prereqs: ['EX294'], duration: '3 hours', version: 'AAP 2', desc: 'Focuses on the administration of Ansible Automation Platform, including installation, scaling, and security.', url: 'https://www.redhat.com/en/services/training/ex467-red-hat-certified-specialist-managing-automation-ansible-automation-platform-exam' },
        ],
      },
      {
        label: 'Architect',
        certs: [
          { code: 'RHCA-ANS', name: 'Red Hat Certified Architect in Ansible Automation', level: 5, type: 'architect', credential: 'RHCA', prereqs: ['EX294'], duration: 'Portfolio', version: '—', desc: 'Awarded to RHCEs who pass 5 specialist exams from the Ansible Automation concentration.', url: 'https://www.redhat.com/en/services/certifications/architect' },
        ],
      },
    ],
  },
  {
    id: 'openshift',
    name: 'OpenShift',
    desc: 'Container platform engineering, Kubernetes administration, and OpenShift operations',
    color: '#7c3aed',
    rhcaRequirement: { required: ['EX280','EX380'], electivesNeeded: 3 },
    levels: [
      {
        label: 'Technologist',
        certs: [
          { code: 'EX180', name: 'Red Hat Certified Technologist in OpenShift', level: 1, type: 'technologist', credential: 'RHCT in OpenShift', prereqs: [], duration: '2 hours', version: 'OCP 4', desc: 'Entry-level cert for container fundamentals: Podman, Docker, and basic OpenShift resource management.', url: 'https://www.redhat.com/en/services/training/ex180-red-hat-certified-specialist-containers-exam' },
          { code: 'EX156', name: 'Red Hat Certified Technologist in OpenShift Virtualization', level: 1, type: 'technologist', credential: 'RHCT in OpenShift Virtualization', prereqs: [], duration: '2 hours', version: 'OCP 4', desc: 'Focuses on the basics of running virtual machines on OpenShift using KubeVirt.', url: 'https://www.redhat.com/en/services/training/ex156-red-hat-certified-technologist-openshift-virtualization-exam' },
        ],
      },
      {
        label: 'Administrator',
        certs: [
          { code: 'EX280', name: 'Red Hat Certified System Administrator in OpenShift', level: 2, type: 'required', credential: 'RHCSA in OpenShift', prereqs: [], duration: '3 hours', version: 'OCP 4', desc: 'The core admin cert for OpenShift: cluster installation, user management, storage, networking, and application deployment.', url: 'https://www.redhat.com/en/services/training/ex280-red-hat-certified-system-administrator-red-hat-openshift-container-platform-exam' },
          { code: 'EX380', name: 'Red Hat Certified Advanced System Administrator in OpenShift', level: 3, type: 'required', credential: 'RHCE — OpenShift', prereqs: ['EX280'], duration: '3.5 hours', version: 'OCP 4', desc: 'Advanced cluster operations: automation, scaling, monitoring, and day-2 operations.', url: 'https://www.redhat.com/en/services/training/ex380-red-hat-certified-advanced-system-administrator-openshift-exam' },
        ],
      },
      {
        label: 'Specialist Electives (choose 3 for RHCA)',
        certs: [
          { code: 'EX316', name: 'Red Hat Certified Specialist in OpenShift Virtualization', level: 4, type: 'elective', credential: 'RHCS in OpenShift Virtualization', prereqs: ['EX280'], duration: '3 hours', version: 'OCP 4', desc: 'Advanced VM management on OpenShift: networking, storage, and migration.', url: 'https://www.redhat.com/en/services/training/ex316-red-hat-certified-specialist-openshift-virtualization-exam' },
          { code: 'EX336', name: 'Red Hat Certified Specialist in Automating OpenShift Virtual Machine Management', level: 4, type: 'elective', credential: 'RHCS in Automating OpenShift VM Management', prereqs: ['EX280'], duration: '3 hours', version: 'OCP 4', desc: 'Focuses on using Ansible to automate VM lifecycle on OpenShift.', url: 'https://www.redhat.com/en/services/training/ex336-red-hat-certified-specialist-automating-openshift-virtual-machine-management-exam' },
          { code: 'EX370', name: 'Red Hat Certified Specialist in OpenShift Data Foundation', level: 4, type: 'elective', credential: 'RHCS in OpenShift Data Foundation', prereqs: ['EX280'], duration: '3 hours', version: 'ODF 4', desc: 'Validates skills in deploying and managing Red Hat OpenShift Data Foundation (formerly OCS) for persistent storage in OpenShift.', url: 'https://www.redhat.com/en/services/training/ex370-red-hat-certified-specialist-openshift-data-foundation-exam' },
          { code: 'EX388', name: 'Red Hat Certified Specialist in OpenShift AI', level: 4, type: 'elective', credential: 'RHCS in OpenShift AI', prereqs: ['EX280'], duration: '3 hours', version: 'RHOAI 2', desc: 'Validates skills in deploying and managing AI/ML workloads using Red Hat OpenShift AI (RHOAI).', url: 'https://www.redhat.com/en/services/training/ex388-red-hat-certified-specialist-openshift-ai-exam' },
        ],
      },
      {
        label: 'Architect',
        certs: [
          { code: 'RHCA-OCP', name: 'Red Hat Certified Architect in OpenShift', level: 5, type: 'architect', credential: 'RHCA', prereqs: ['EX380'], duration: 'Portfolio', version: '—', desc: 'Awarded to OpenShift RHCEs who complete 5 specialist exams in the OpenShift concentration.', url: 'https://www.redhat.com/en/services/certifications/architect' },
        ],
      },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud-Native',
    desc: 'Cloud-native development, microservices, and hybrid cloud operations',
    color: '#059669',
    rhcaRequirement: { required: ['EX188','EX288'], electivesNeeded: 3 },
    levels: [
      {
        label: 'Developer',
        certs: [
          { code: 'EX188', name: 'Red Hat Certified Enterprise Application Developer', level: 2, type: 'required', credential: 'RHCEAD', prereqs: [], duration: '2.5 hours', version: 'Quarkus 3', desc: 'Validates core cloud-native development skills using Java and Quarkus, including RESTful services, persistence, security, and messaging.', url: 'https://www.redhat.com/en/services/training/ex188-red-hat-certified-enterprise-application-developer-exam' },
          { code: 'EX288', name: 'Red Hat Certified Specialist in OpenShift Application Development', level: 3, type: 'required', credential: 'RHCS in OpenShift Application Development', prereqs: ['EX188'], duration: '3 hours', version: 'OCP 4', desc: 'Tests skills in building and deploying containerized applications on OpenShift using S2I, pipelines, and GitOps.', url: 'https://www.redhat.com/en/services/training/ex288-red-hat-certified-specialist-openshift-application-development-exam' },
        ],
      },
      {
        label: 'Specialist Electives (choose 3 for RHCA)',
        certs: [
          { code: 'EX378', name: 'Red Hat Certified Specialist in GitOps', level: 4, type: 'elective', credential: 'RHCS in GitOps', prereqs: ['EX288'], duration: '3 hours', version: 'ArgoCD / OCP 4', desc: 'Validates skills in implementing GitOps workflows using OpenShift GitOps (ArgoCD) for application lifecycle management.', url: 'https://www.redhat.com/en/services/training/ex378-red-hat-certified-specialist-gitops-exam' },
          { code: 'EX328', name: 'Red Hat Certified Specialist in Building Resilient Microservices', level: 4, type: 'elective', credential: 'RHCS in Building Resilient Microservices', prereqs: ['EX288'], duration: '3 hours', version: 'Quarkus / Istio', desc: 'Tests skills in building fault-tolerant microservices using patterns like circuit breaker, retry, and service mesh with Istio.', url: 'https://www.redhat.com/en/services/training/ex328-red-hat-certified-specialist-building-resilient-microservices-exam' },
          { code: 'EX421', name: 'Red Hat Certified Specialist in Multicluster Management', level: 4, type: 'elective', credential: 'RHCS in Multicluster Management', prereqs: ['EX280'], duration: '3 hours', version: 'RHACM 2', desc: 'Validates skills in managing multiple OpenShift clusters using Red Hat Advanced Cluster Management (RHACM).', url: 'https://www.redhat.com/en/services/training/ex421-red-hat-certified-specialist-multicluster-management-exam' },
        ],
      },
      {
        label: 'Architect',
        certs: [
          { code: 'RHCA-CN', name: 'Red Hat Certified Architect in Cloud-Native', level: 5, type: 'architect', credential: 'RHCA', prereqs: ['EX288'], duration: 'Portfolio', version: '—', desc: 'Awarded to developers who complete 5 specialist exams in the Cloud-Native concentration.', url: 'https://www.redhat.com/en/services/certifications/architect' },
        ],
      },
    ],
  },
  {
    id: 'ai',
    name: 'AI',
    desc: 'AI/ML model serving, LLMOps, and intelligent application development',
    color: '#d97706',
    rhcaRequirement: { required: ['EX488'], electivesNeeded: 4 },
    levels: [
      {
        label: 'Foundation',
        certs: [
          { code: 'EX488', name: 'Red Hat Certified Specialist in AI', level: 3, type: 'required', credential: 'RHCS in AI', prereqs: [], duration: '3 hours', version: 'RHOAI 2', desc: 'Validates skills in deploying, serving, and monitoring AI/ML models using Red Hat OpenShift AI, including pipelines and model serving.', url: 'https://www.redhat.com/en/services/training/ex488-red-hat-certified-specialist-ai-exam' },
        ],
      },
      {
        label: 'Specialist Electives (choose 4 for RHCA)',
        certs: [
          { code: 'EX492', name: 'Red Hat Certified Specialist in AI Model Fine-Tuning', level: 4, type: 'elective', credential: 'RHCS in AI Model Fine-Tuning', prereqs: ['EX488'], duration: '3 hours', version: 'RHOAI 2', desc: 'Focuses on fine-tuning large language models (LLMs) using InstructLab and Hugging Face on OpenShift AI.', url: 'https://www.redhat.com/en/services/training/ex492-red-hat-certified-specialist-ai-model-fine-tuning-exam' },
          { code: 'EX496', name: 'Red Hat Certified Specialist in LLMOps', level: 4, type: 'elective', credential: 'RHCS in LLMOps', prereqs: ['EX488'], duration: '3 hours', version: 'RHOAI 2', desc: 'Validates skills in operationalizing LLMs: versioning, A/B testing, monitoring drift, and managing inference endpoints at scale.', url: 'https://www.redhat.com/en/services/training/ex496-red-hat-certified-specialist-llmops-exam' },
          { code: 'EX498', name: 'Red Hat Certified Specialist in AI-Infused Application Development', level: 4, type: 'elective', credential: 'RHCS in AI-Infused Application Development', prereqs: ['EX488'], duration: '3 hours', version: 'RHOAI 2 / Quarkus', desc: 'Tests skills in building applications that integrate LLM inference, RAG pipelines, and vector databases into cloud-native workloads.', url: 'https://www.redhat.com/en/services/training/ex498-red-hat-certified-specialist-ai-infused-application-development-exam' },
        ],
      },
      {
        label: 'Architect',
        certs: [
          { code: 'RHCA-AI', name: 'Red Hat Certified Architect in AI', level: 5, type: 'architect', credential: 'RHCA', prereqs: ['EX488'], duration: 'Portfolio', version: '—', desc: 'Awarded to specialists who complete 5 AI-track exams, demonstrating mastery of enterprise AI/ML operations on Red Hat platforms.', url: 'https://www.redhat.com/en/services/certifications/architect' },
        ],
      },
    ],
  },
];
