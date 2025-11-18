import { useFichas } from '@/contexts/FichaContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import {
    Button,
    Card,
    Checkbox,
    Divider,
    SegmentedButtons,
    Text,
    TextInput,
} from 'react-native-paper';

export default function NovaFichaCompletaScreen() {
  const router = useRouter();
  const { addFicha } = useFichas();

  // Estados para as abas
  const [abaAtual, setAbaAtual] = useState('dados-basicos');

  // Dados do cabeçalho
  const [kmInicial, setKmInicial] = useState('');
  const [kmFinal, setKmFinal] = useState('');

  // Motivo da solicitação
  const [motivoSolicitacao, setMotivoSolicitacao] = useState('');

  // Classificação de risco
  const [vermelha, setVermelha] = useState(false);
  const [amarela, setAmarela] = useState(false);
  const [verde, setVerde] = useState(false);
  const [azul, setAzul] = useState(false);

  // Dados do local da ocorrência
  const [residencia, setResidencia] = useState(false);
  const [viaPublica, setViaPublica] = useState(false);
  const [rodovia, setRodovia] = useState(false);
  const [ps, setPs] = useState(false);
  const [ubs, setUbs] = useState(false);
  const [localOcorrenciaOutros, setLocalOcorrenciaOutros] = useState('');
  const [enderecoOcorrencia, setEnderecoOcorrencia] = useState('');
  const [numeroEnderecoOcorrencia, setNumeroEnderecoOcorrencia] = useState('');
  const [referenciaEnderecoOcorrencia, setReferenciaEnderecoOcorrencia] = useState('');
  const [contatoEnderecoOcorrencia, setContatoEnderecoOcorrencia] = useState('');

  // Dados da vítima
  const [nomeVitima, setNomeVitima] = useState('');
  const [idadeVitima, setIdadeVitima] = useState('');
  const [dataNascimentoVitima, setDataNascimentoVitima] = useState('');
  const [enderecoVitima, setEnderecoVitima] = useState('');
  const [numeroEnderecoVitima, setNumeroEnderecoVitima] = useState('');
  const [bairroEnderecoVitima, setBairroEnderecoVitima] = useState('');
  const [nomePaiVitima, setNomePaiVitima] = useState('');
  const [nomeMaeVitima, setNomeMaeVitima] = useState('');
  const [cnsVitima, setCnsVitima] = useState('');
  const [rgVitima, setRgVitima] = useState('');
  const [cpfVitima, setCpfVitima] = useState('');

  // Dados do chamado
  const [horaChamado, setHoraChamado] = useState('');
  const [horaTransmissao, setHoraTransmissao] = useState('');
  const [horaSaida, setHoraSaida] = useState('');
  const [horaChegadaLocal, setHoraChegadaLocal] = useState('');
  const [horaSaidaLocal, setHoraSaidaLocal] = useState('');
  const [horaChegadaHospital, setHoraChegadaHospital] = useState('');
  const [horaSaidaHospital, setHoraSaidaHospital] = useState('');
  const [horaRetornoBase, setHoraRetornoBase] = useState('');

  // Tipo de atendimento
  const [atropelamento, setAtropelamento] = useState(false);
  const [suspeitaIam, setSuspeitaIam] = useState(false);
  const [queimaduras, setQueimaduras] = useState(false);
  const [psiquiatrico, setPsiquiatrico] = useState(false);
  const [transferencia, setTransferencia] = useState(false);
  const [acidenteTransito, setAcidenteTransito] = useState(false);
  const [suspeitaAvc, setSuspeitaAvc] = useState(false);
  const [intoxicacao, setIntoxicacao] = useState(false);
  const [hipoHipertensao, setHipoHipertensao] = useState(false);
  const [obstetricia, setObstetricia] = useState(false);
  const [agressao, setAgressao] = useState(false);
  const [queda, setQueda] = useState(false);
  const [hipoHiperglicemia, setHipoHiperglicemia] = useState(false);
  const [alcoolizado, setAlcoolizado] = useState(false);
  const [outrosTipoAtendimento, setOutrosTipoAtendimento] = useState('');

  // Situação local
  const [morteObvia, setMorteObvia] = useState(false);
  const [chamadoFalso, setChamadoFalso] = useState(false);
  const [evadiu, setEvadiu] = useState(false);
  const [qta, setQta] = useState(false);
  const [outrosSituacaoLocal, setOutrosSituacaoLocal] = useState('');
  const [descricaoCena, setDescricaoCena] = useState('');

  // Avaliação primária
  const [viaAereaLiberada, setViaAereaLiberada] = useState(false);
  const [respiracao, setRespiracao] = useState(false);
  const [circulacao, setCirculacao] = useState(false);
  const [consciente, setConsciente] = useState(false);

  // Pupilas
  const [direitaMidriase, setDireitaMidriase] = useState(false);
  const [direitaIsocoria, setDireitaIsocoria] = useState(false);
  const [direitaMiose, setDireitaMiose] = useState(false);
  const [direitaReativa, setDireitaReativa] = useState(false);
  const [esquerdaMidriase, setEsquerdaMidriase] = useState(false);
  const [esquerdaIsocoria, setEsquerdaIsocoria] = useState(false);
  const [esquerdaMiose, setEsquerdaMiose] = useState(false);
  const [esquerdaReativa, setEsquerdaReativa] = useState(false);

  // Sinais vitais
  const [pressaoSistolica, setPressaoSistolica] = useState('');
  const [pressaoDiastolica, setPressaoDiastolica] = useState('');
  const [frequenciaCardiaca, setFrequenciaCardiaca] = useState('');
  const [frequenciaRespiratoria, setFrequenciaRespiratoria] = useState('');
  const [saturacao, setSaturacao] = useState('');
  const [dextro, setDextro] = useState('');
  const [temperatura, setTemperatura] = useState('');

  // Pele
  const [corada, setCorada] = useState(false);
  const [cianotica, setCianotica] = useState(false);
  const [quente, setQuente] = useState(false);
  const [fria, setFria] = useState(false);
  const [icterica, setIcterica] = useState(false);
  const [sudoreica, setSudoreica] = useState(false);

  // Antecedentes patológicos
  const [iam, setIam] = useState(false);
  const [avc, setAvc] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [asmaBronquite, setAsmaBronquite] = useState(false);
  const [convulsao, setConvulsao] = useState(false);
  const [has, setHas] = useState(false);
  const [ca, setCa] = useState(false);

  // Medicamentos e alergias
  const [medicamentosEmUso, setMedicamentosEmUso] = useState('');
  const [alergias, setAlergias] = useState('');

  // Procedimentos realizados
  const [canulaGuedel, setCanulaGuedel] = useState(false);
  const [oxigenio, setOxigenio] = useState(false);
  const [oximetria, setOximetria] = useState(false);
  const [acessoVenoso, setAcessoVenoso] = useState(false);
  const [rcp, setRcp] = useState(false);
  const [dea, setDea] = useState(false);
  const [colarCervical, setColarCervical] = useState(false);
  const [prancha, setPrancha] = useState(false);
  const [ked, setKed] = useState(false);
  const [talas, setTalas] = useState(false);
  const [contensaoPsq, setContensaoPsq] = useState(false);
  const [kitParto, setKitParto] = useState(false);
  const [curativo, setCurativo] = useState(false);
  const [apoioUsa, setApoioUsa] = useState(false);
  const [procedimentosRealizadosOutros, setProcedimentosRealizadosOutros] = useState('');

  // Outros campos
  const [conduta, setConduta] = useState('');
  const [medicoRegulador, setMedicoRegulador] = useState('');
  const [pertences, setPertences] = useState('');
  const [relatorioEnfermagem, setRelatorioEnfermagem] = useState('');

  // Campos de isenção
  const [recusaAtendimento, setRecusaAtendimento] = useState(false);
  const [confirmacaoComparecimento, setConfirmacaoComparecimento] = useState(false);
  const [altaLocal, setAltaLocal] = useState(false);

  // Assinaturas e carimbos
  const [assinaturaResponsavel, setAssinaturaResponsavel] = useState('');
  const [rgResponsavel, setRgResponsavel] = useState('');
  const [carimboDestino, setCarimboDestino] = useState('');
  const [carimboRecebidoPor, setCarimboRecebidoPor] = useState('');
  const [carimboTecnicoEnfermagem, setCarimboTecnicoEnfermagem] = useState('');
  const [carimboSocorrista, setCarimboSocorrista] = useState('');

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0].substring(0, 5);
    return { date, time };
  };

  const handleSave = () => {
    if (!nomeVitima.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome da vítima');
      return;
    }

    if (!idadeVitima.trim() || isNaN(Number(idadeVitima))) {
      Alert.alert('Erro', 'Por favor, informe uma idade válida');
      return;
    }

    if (!motivoSolicitacao.trim()) {
      Alert.alert('Erro', 'Por favor, informe o motivo da solicitação');
      return;
    }

    const { date, time } = getCurrentDateTime();

    addFicha({
      dataAtendimento: date,
      kmInicial: kmInicial || undefined,
      kmFinal: kmFinal || undefined,
      motivoSolicitacao: motivoSolicitacao.trim(),
      vermelha,
      amarela,
      verde,
      azul,
      residencia,
      viaPublica,
      rodovia,
      ps,
      ubs,
      localOcorrenciaOutros: localOcorrenciaOutros || undefined,
      enderecoOcorrencia: enderecoOcorrencia || undefined,
      numeroEnderecoOcorrencia: numeroEnderecoOcorrencia ? Number(numeroEnderecoOcorrencia) : undefined,
      referenciaEnderecoOcorrencia: referenciaEnderecoOcorrencia || undefined,
      contatoEnderecoOcorrencia: contatoEnderecoOcorrencia || undefined,
      nomeVitima: nomeVitima.trim(),
      idadeVitima: Number(idadeVitima),
      dataNascimentoVitima: dataNascimentoVitima || undefined,
      enderecoVitima: enderecoVitima || undefined,
      numeroEnderecoVitima: numeroEnderecoVitima || undefined,
      bairroEnderecoVitima: bairroEnderecoVitima || undefined,
      nomePaiVitima: nomePaiVitima || undefined,
      nomeMaeVitima: nomeMaeVitima || undefined,
      cnsVitima: cnsVitima || undefined,
      rgVitima: rgVitima || undefined,
      cpfVitima: cpfVitima || undefined,
      horaChamado: horaChamado || time,
      horaTransmissao: horaTransmissao || undefined,
      horaSaida: horaSaida || undefined,
      horaChegadaLocal: horaChegadaLocal || undefined,
      horaSaidaLocal: horaSaidaLocal || undefined,
      horaChegadaHospital: horaChegadaHospital || undefined,
      horaSaidaHospital: horaSaidaHospital || undefined,
      horaRetornoBase: horaRetornoBase || undefined,
      atropelamento,
      suspeitaIam,
      queimaduras,
      psiquiatrico,
      transferencia,
      acidenteTransito,
      suspeitaAvc,
      intoxicacao,
      hipoHipertensao,
      obstetricia,
      agressao,
      queda,
      hipoHiperglicemia,
      alcoolizado,
      outrosTipoAtendimento: outrosTipoAtendimento || undefined,
      morteObvia,
      chamadoFalso,
      evadiu,
      qta,
      outrosSituacaoLocal: outrosSituacaoLocal || undefined,
      descricaoCena: descricaoCena || undefined,
      viaAereaLiberada,
      respiracao,
      circulacao,
      consciente,
      direitaMidriase,
      direitaIsocoria,
      direitaMiose,
      direitaReativa,
      esquerdaMidriase,
      esquerdaIsocoria,
      esquerdaMiose,
      esquerdaReativa,
      pressaoSistolica: pressaoSistolica ? Number(pressaoSistolica) : undefined,
      pressaoDiastolica: pressaoDiastolica ? Number(pressaoDiastolica) : undefined,
      frequenciaCardiaca: frequenciaCardiaca ? Number(frequenciaCardiaca) : undefined,
      frequenciaRespiratoria: frequenciaRespiratoria ? Number(frequenciaRespiratoria) : undefined,
      saturacao: saturacao ? Number(saturacao) : undefined,
      dextro: dextro ? Number(dextro) : undefined,
      temperatura: temperatura ? Number(temperatura) : undefined,
      corada,
      cianotica,
      quente,
      fria,
      icterica,
      sudoreica,
      iam,
      avc,
      diabetes,
      asmaBronquite,
      convulsao,
      has,
      ca,
      medicamentosEmUso: medicamentosEmUso || undefined,
      alergias: alergias || undefined,
      canulaGuedel,
      oxigenio,
      oximetria,
      acessoVenoso,
      rcp,
      dea,
      colarCervical,
      prancha,
      ked,
      talas,
      contensaoPsq,
      kitParto,
      curativo,
      apoioUsa,
      procedimentosRealizadosOutros: procedimentosRealizadosOutros || undefined,
      conduta: conduta || undefined,
      medicoRegulador: medicoRegulador || undefined,
      pertences: pertences || undefined,
      relatorioEnfermagem: relatorioEnfermagem || undefined,
      recusaAtendimento,
      confirmacaoComparecimento,
      altaLocal,
      assinaturaResponsavel: assinaturaResponsavel || undefined,
      rgResponsavel: rgResponsavel || undefined,
      carimboDestino: carimboDestino || undefined,
      carimboRecebidoPor: carimboRecebidoPor || undefined,
      carimboTecnicoEnfermagem: carimboTecnicoEnfermagem || undefined,
      carimboSocorrista: carimboSocorrista || undefined,
      status: 'Em andamento',
    });

    Alert.alert('Sucesso', 'Ficha cadastrada com sucesso!', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
  };

  const renderDadosBasicos = () => (
    <>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Dados do Cabeçalho
      </Text>
      <TextInput
        label="KM Inicial"
        value={kmInicial}
        onChangeText={setKmInicial}
        mode="outlined"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        label="KM Final"
        value={kmFinal}
        onChangeText={setKmFinal}
        mode="outlined"
        style={styles.input}
        keyboardType="numeric"
      />

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Motivo da Solicitação *
      </Text>
      <TextInput
        label="Motivo"
        value={motivoSolicitacao}
        onChangeText={setMotivoSolicitacao}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
      />

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Classificação de Risco
      </Text>
      <View style={styles.checkboxRow}>
        <Checkbox.Item
          label="Vermelha (Emergência)"
          status={vermelha ? 'checked' : 'unchecked'}
          onPress={() => setVermelha(!vermelha)}
        />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item
          label="Amarela (Urgente)"
          status={amarela ? 'checked' : 'unchecked'}
          onPress={() => setAmarela(!amarela)}
        />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item
          label="Verde (Pouco Urgente)"
          status={verde ? 'checked' : 'unchecked'}
          onPress={() => setVerde(!verde)}
        />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item
          label="Azul (Não Urgente)"
          status={azul ? 'checked' : 'unchecked'}
          onPress={() => setAzul(!azul)}
        />
      </View>
    </>
  );

  const renderLocalOcorrencia = () => (
    <>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Tipo de Local
      </Text>
      <View style={styles.checkboxRow}>
        <Checkbox.Item
          label="Residência"
          status={residencia ? 'checked' : 'unchecked'}
          onPress={() => setResidencia(!residencia)}
        />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item
          label="Via Pública"
          status={viaPublica ? 'checked' : 'unchecked'}
          onPress={() => setViaPublica(!viaPublica)}
        />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item
          label="Rodovia"
          status={rodovia ? 'checked' : 'unchecked'}
          onPress={() => setRodovia(!rodovia)}
        />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item
          label="PS (Pronto Socorro)"
          status={ps ? 'checked' : 'unchecked'}
          onPress={() => setPs(!ps)}
        />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item
          label="UBS (Unidade Básica de Saúde)"
          status={ubs ? 'checked' : 'unchecked'}
          onPress={() => setUbs(!ubs)}
        />
      </View>
      <TextInput
        label="Outros"
        value={localOcorrenciaOutros}
        onChangeText={setLocalOcorrenciaOutros}
        mode="outlined"
        style={styles.input}
      />

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Endereço da Ocorrência
      </Text>
      <TextInput
        label="Endereço"
        value={enderecoOcorrencia}
        onChangeText={setEnderecoOcorrencia}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Número"
        value={numeroEnderecoOcorrencia}
        onChangeText={setNumeroEnderecoOcorrencia}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Referência"
        value={referenciaEnderecoOcorrencia}
        onChangeText={setReferenciaEnderecoOcorrencia}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Contato"
        value={contatoEnderecoOcorrencia}
        onChangeText={setContatoEnderecoOcorrencia}
        mode="outlined"
        keyboardType="phone-pad"
        style={styles.input}
      />
    </>
  );

  const renderDadosVitima = () => (
    <>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Dados da Vítima *
      </Text>
      <TextInput
        label="Nome Completo *"
        value={nomeVitima}
        onChangeText={setNomeVitima}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Idade *"
        value={idadeVitima}
        onChangeText={setIdadeVitima}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Data de Nascimento"
        value={dataNascimentoVitima}
        onChangeText={setDataNascimentoVitima}
        mode="outlined"
        placeholder="DD/MM/AAAA"
        style={styles.input}
      />
      <TextInput
        label="Endereço"
        value={enderecoVitima}
        onChangeText={setEnderecoVitima}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Número"
        value={numeroEnderecoVitima}
        onChangeText={setNumeroEnderecoVitima}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Bairro"
        value={bairroEnderecoVitima}
        onChangeText={setBairroEnderecoVitima}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Nome do Pai"
        value={nomePaiVitima}
        onChangeText={setNomePaiVitima}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Nome da Mãe"
        value={nomeMaeVitima}
        onChangeText={setNomeMaeVitima}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="CNS (Cartão SUS)"
        value={cnsVitima}
        onChangeText={setCnsVitima}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="RG"
        value={rgVitima}
        onChangeText={setRgVitima}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="CPF"
        value={cpfVitima}
        onChangeText={setCpfVitima}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
    </>
  );

  const renderHorarios = () => (
    <>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Horários do Atendimento
      </Text>
      <TextInput
        label="Hora do Chamado"
        value={horaChamado}
        onChangeText={setHoraChamado}
        mode="outlined"
        placeholder="HH:MM"
        style={styles.input}
      />
      <TextInput
        label="Hora da Transmissão"
        value={horaTransmissao}
        onChangeText={setHoraTransmissao}
        mode="outlined"
        placeholder="HH:MM"
        style={styles.input}
      />
      <TextInput
        label="Hora da Saída"
        value={horaSaida}
        onChangeText={setHoraSaida}
        mode="outlined"
        placeholder="HH:MM"
        style={styles.input}
      />
      <TextInput
        label="Hora da Chegada no Local"
        value={horaChegadaLocal}
        onChangeText={setHoraChegadaLocal}
        mode="outlined"
        placeholder="HH:MM"
        style={styles.input}
      />
      <TextInput
        label="Hora da Saída do Local"
        value={horaSaidaLocal}
        onChangeText={setHoraSaidaLocal}
        mode="outlined"
        placeholder="HH:MM"
        style={styles.input}
      />
      <TextInput
        label="Hora da Chegada no Hospital"
        value={horaChegadaHospital}
        onChangeText={setHoraChegadaHospital}
        mode="outlined"
        placeholder="HH:MM"
        style={styles.input}
      />
      <TextInput
        label="Hora da Saída do Hospital"
        value={horaSaidaHospital}
        onChangeText={setHoraSaidaHospital}
        mode="outlined"
        placeholder="HH:MM"
        style={styles.input}
      />
      <TextInput
        label="Hora do Retorno à Base"
        value={horaRetornoBase}
        onChangeText={setHoraRetornoBase}
        mode="outlined"
        placeholder="HH:MM"
        style={styles.input}
      />
    </>
  );

  const renderTipoAtendimento = () => (
    <>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Tipo de Atendimento
      </Text>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Atropelamento" status={atropelamento ? 'checked' : 'unchecked'} onPress={() => setAtropelamento(!atropelamento)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Suspeita de IAM" status={suspeitaIam ? 'checked' : 'unchecked'} onPress={() => setSuspeitaIam(!suspeitaIam)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Queimaduras" status={queimaduras ? 'checked' : 'unchecked'} onPress={() => setQueimaduras(!queimaduras)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Psiquiátrico" status={psiquiatrico ? 'checked' : 'unchecked'} onPress={() => setPsiquiatrico(!psiquiatrico)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Transferência" status={transferencia ? 'checked' : 'unchecked'} onPress={() => setTransferencia(!transferencia)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Acidente de Trânsito" status={acidenteTransito ? 'checked' : 'unchecked'} onPress={() => setAcidenteTransito(!acidenteTransito)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Suspeita de AVC" status={suspeitaAvc ? 'checked' : 'unchecked'} onPress={() => setSuspeitaAvc(!suspeitaAvc)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Intoxicação" status={intoxicacao ? 'checked' : 'unchecked'} onPress={() => setIntoxicacao(!intoxicacao)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Hipo/Hipertensão" status={hipoHipertensao ? 'checked' : 'unchecked'} onPress={() => setHipoHipertensao(!hipoHipertensao)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Obstetrícia" status={obstetricia ? 'checked' : 'unchecked'} onPress={() => setObstetricia(!obstetricia)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Agressão" status={agressao ? 'checked' : 'unchecked'} onPress={() => setAgressao(!agressao)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Queda" status={queda ? 'checked' : 'unchecked'} onPress={() => setQueda(!queda)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Hipo/Hiperglicemia" status={hipoHiperglicemia ? 'checked' : 'unchecked'} onPress={() => setHipoHiperglicemia(!hipoHiperglicemia)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Alcoolizado" status={alcoolizado ? 'checked' : 'unchecked'} onPress={() => setAlcoolizado(!alcoolizado)} />
      </View>
      <TextInput
        label="Outros"
        value={outrosTipoAtendimento}
        onChangeText={setOutrosTipoAtendimento}
        mode="outlined"
        style={styles.input}
      />

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Situação no Local
      </Text>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Morte Óbvia" status={morteObvia ? 'checked' : 'unchecked'} onPress={() => setMorteObvia(!morteObvia)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Chamado Falso" status={chamadoFalso ? 'checked' : 'unchecked'} onPress={() => setChamadoFalso(!chamadoFalso)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Evadiu" status={evadiu ? 'checked' : 'unchecked'} onPress={() => setEvadiu(!evadiu)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="QTA" status={qta ? 'checked' : 'unchecked'} onPress={() => setQta(!qta)} />
      </View>
      <TextInput
        label="Outros"
        value={outrosSituacaoLocal}
        onChangeText={setOutrosSituacaoLocal}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Descrição da Cena"
        value={descricaoCena}
        onChangeText={setDescricaoCena}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
      />
    </>
  );

  const renderDadosClinicos = () => (
    <>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Avaliação Primária
      </Text>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Via Aérea Liberada" status={viaAereaLiberada ? 'checked' : 'unchecked'} onPress={() => setViaAereaLiberada(!viaAereaLiberada)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Respiração" status={respiracao ? 'checked' : 'unchecked'} onPress={() => setRespiracao(!respiracao)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Circulação" status={circulacao ? 'checked' : 'unchecked'} onPress={() => setCirculacao(!circulacao)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Consciente" status={consciente ? 'checked' : 'unchecked'} onPress={() => setConsciente(!consciente)} />
      </View>

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Pupilas - Direita
      </Text>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Midríase" status={direitaMidriase ? 'checked' : 'unchecked'} onPress={() => setDireitaMidriase(!direitaMidriase)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Isocoria" status={direitaIsocoria ? 'checked' : 'unchecked'} onPress={() => setDireitaIsocoria(!direitaIsocoria)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Miose" status={direitaMiose ? 'checked' : 'unchecked'} onPress={() => setDireitaMiose(!direitaMiose)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Reativa" status={direitaReativa ? 'checked' : 'unchecked'} onPress={() => setDireitaReativa(!direitaReativa)} />
      </View>

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Pupilas - Esquerda
      </Text>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Midríase" status={esquerdaMidriase ? 'checked' : 'unchecked'} onPress={() => setEsquerdaMidriase(!esquerdaMidriase)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Isocoria" status={esquerdaIsocoria ? 'checked' : 'unchecked'} onPress={() => setEsquerdaIsocoria(!esquerdaIsocoria)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Miose" status={esquerdaMiose ? 'checked' : 'unchecked'} onPress={() => setEsquerdaMiose(!esquerdaMiose)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Reativa" status={esquerdaReativa ? 'checked' : 'unchecked'} onPress={() => setEsquerdaReativa(!esquerdaReativa)} />
      </View>

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Sinais Vitais
      </Text>
      <TextInput
        label="Pressão Sistólica (mmHg)"
        value={pressaoSistolica}
        onChangeText={setPressaoSistolica}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Pressão Diastólica (mmHg)"
        value={pressaoDiastolica}
        onChangeText={setPressaoDiastolica}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Frequência Cardíaca (bpm)"
        value={frequenciaCardiaca}
        onChangeText={setFrequenciaCardiaca}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Frequência Respiratória (rpm)"
        value={frequenciaRespiratoria}
        onChangeText={setFrequenciaRespiratoria}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Saturação (%)"
        value={saturacao}
        onChangeText={setSaturacao}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Dextro (mg/dL)"
        value={dextro}
        onChangeText={setDextro}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Temperatura (°C)"
        value={temperatura}
        onChangeText={setTemperatura}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Pele
      </Text>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Corada" status={corada ? 'checked' : 'unchecked'} onPress={() => setCorada(!corada)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Cianótica" status={cianotica ? 'checked' : 'unchecked'} onPress={() => setCianotica(!cianotica)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Quente" status={quente ? 'checked' : 'unchecked'} onPress={() => setQuente(!quente)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Fria" status={fria ? 'checked' : 'unchecked'} onPress={() => setFria(!fria)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Ictérica" status={icterica ? 'checked' : 'unchecked'} onPress={() => setIcterica(!icterica)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Sudoreica" status={sudoreica ? 'checked' : 'unchecked'} onPress={() => setSudoreica(!sudoreica)} />
      </View>

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Antecedentes Patológicos
      </Text>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="IAM" status={iam ? 'checked' : 'unchecked'} onPress={() => setIam(!iam)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="AVC" status={avc ? 'checked' : 'unchecked'} onPress={() => setAvc(!avc)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Diabetes" status={diabetes ? 'checked' : 'unchecked'} onPress={() => setDiabetes(!diabetes)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Asma/Bronquite" status={asmaBronquite ? 'checked' : 'unchecked'} onPress={() => setAsmaBronquite(!asmaBronquite)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Convulsão" status={convulsao ? 'checked' : 'unchecked'} onPress={() => setConvulsao(!convulsao)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="HAS (Hipertensão)" status={has ? 'checked' : 'unchecked'} onPress={() => setHas(!has)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="CA (Câncer)" status={ca ? 'checked' : 'unchecked'} onPress={() => setCa(!ca)} />
      </View>

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Medicamentos e Alergias
      </Text>
      <TextInput
        label="Medicamentos em Uso"
        value={medicamentosEmUso}
        onChangeText={setMedicamentosEmUso}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
      />
      <TextInput
        label="Alergias"
        value={alergias}
        onChangeText={setAlergias}
        mode="outlined"
        multiline
        numberOfLines={2}
        style={styles.input}
      />
    </>
  );

  const renderProcedimentos = () => (
    <>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Procedimentos Realizados
      </Text>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Cânula de Guedel" status={canulaGuedel ? 'checked' : 'unchecked'} onPress={() => setCanulaGuedel(!canulaGuedel)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Oxigênio" status={oxigenio ? 'checked' : 'unchecked'} onPress={() => setOxigenio(!oxigenio)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Oximetria" status={oximetria ? 'checked' : 'unchecked'} onPress={() => setOximetria(!oximetria)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Acesso Venoso" status={acessoVenoso ? 'checked' : 'unchecked'} onPress={() => setAcessoVenoso(!acessoVenoso)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="RCP" status={rcp ? 'checked' : 'unchecked'} onPress={() => setRcp(!rcp)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="DEA" status={dea ? 'checked' : 'unchecked'} onPress={() => setDea(!dea)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Colar Cervical" status={colarCervical ? 'checked' : 'unchecked'} onPress={() => setColarCervical(!colarCervical)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Prancha" status={prancha ? 'checked' : 'unchecked'} onPress={() => setPrancha(!prancha)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="KED" status={ked ? 'checked' : 'unchecked'} onPress={() => setKed(!ked)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Talas" status={talas ? 'checked' : 'unchecked'} onPress={() => setTalas(!talas)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Contenção Psiquiátrica" status={contensaoPsq ? 'checked' : 'unchecked'} onPress={() => setContensaoPsq(!contensaoPsq)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Kit Parto" status={kitParto ? 'checked' : 'unchecked'} onPress={() => setKitParto(!kitParto)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Curativo" status={curativo ? 'checked' : 'unchecked'} onPress={() => setCurativo(!curativo)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Apoio USA" status={apoioUsa ? 'checked' : 'unchecked'} onPress={() => setApoioUsa(!apoioUsa)} />
      </View>
      <TextInput
        label="Outros Procedimentos"
        value={procedimentosRealizadosOutros}
        onChangeText={setProcedimentosRealizadosOutros}
        mode="outlined"
        multiline
        numberOfLines={2}
        style={styles.input}
      />

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Conduta e Observações
      </Text>
      <TextInput
        label="Conduta"
        value={conduta}
        onChangeText={setConduta}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
      />
      <TextInput
        label="Médico Regulador"
        value={medicoRegulador}
        onChangeText={setMedicoRegulador}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Pertences do Paciente"
        value={pertences}
        onChangeText={setPertences}
        mode="outlined"
        multiline
        numberOfLines={2}
        style={styles.input}
      />
      <TextInput
        label="Relatório de Enfermagem"
        value={relatorioEnfermagem}
        onChangeText={setRelatorioEnfermagem}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
      />
    </>
  );

  const renderFinalizacao = () => (
    <>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Isenção de Responsabilidade
      </Text>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Recusa de Atendimento" status={recusaAtendimento ? 'checked' : 'unchecked'} onPress={() => setRecusaAtendimento(!recusaAtendimento)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Confirmação de Comparecimento" status={confirmacaoComparecimento ? 'checked' : 'unchecked'} onPress={() => setConfirmacaoComparecimento(!confirmacaoComparecimento)} />
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox.Item label="Alta no Local" status={altaLocal ? 'checked' : 'unchecked'} onPress={() => setAltaLocal(!altaLocal)} />
      </View>

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Assinaturas
      </Text>
      <TextInput
        label="Assinatura do Responsável"
        value={assinaturaResponsavel}
        onChangeText={setAssinaturaResponsavel}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="RG do Responsável"
        value={rgResponsavel}
        onChangeText={setRgResponsavel}
        mode="outlined"
        style={styles.input}
      />

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Carimbos
      </Text>
      <TextInput
        label="Carimbo Destino"
        value={carimboDestino}
        onChangeText={setCarimboDestino}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Carimbo Recebido Por"
        value={carimboRecebidoPor}
        onChangeText={setCarimboRecebidoPor}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Carimbo Técnico de Enfermagem"
        value={carimboTecnicoEnfermagem}
        onChangeText={setCarimboTecnicoEnfermagem}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Carimbo Socorrista"
        value={carimboSocorrista}
        onChangeText={setCarimboSocorrista}
        mode="outlined"
        style={styles.input}
      />
    </>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>
        <SegmentedButtons
          value={abaAtual}
          onValueChange={setAbaAtual}
          buttons={[
            { value: 'dados-basicos', label: 'Básicos' },
            { value: 'local', label: 'Local' },
            { value: 'vitima', label: 'Vítima' },
            { value: 'horarios', label: 'Horários' },
            { value: 'atendimento', label: 'Atend.' },
            { value: 'clinicos', label: 'Clínicos' },
            { value: 'procedimentos', label: 'Proced.' },
            { value: 'finalizacao', label: 'Final' },
          ]}
          style={styles.tabs}
        />

        <ScrollView style={styles.scrollView}>
          <Card style={styles.card}>
            <Card.Content>
              {abaAtual === 'dados-basicos' && renderDadosBasicos()}
              {abaAtual === 'local' && renderLocalOcorrencia()}
              {abaAtual === 'vitima' && renderDadosVitima()}
              {abaAtual === 'horarios' && renderHorarios()}
              {abaAtual === 'atendimento' && renderTipoAtendimento()}
              {abaAtual === 'clinicos' && renderDadosClinicos()}
              {abaAtual === 'procedimentos' && renderProcedimentos()}
              {abaAtual === 'finalizacao' && renderFinalizacao()}
            </Card.Content>
          </Card>

          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.saveButton}
            buttonColor="#E53935"
            icon="content-save"
          >
            Salvar Ficha Completa
          </Button>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  tabs: {
    margin: 10,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 15,
    marginTop: 5,
    elevation: 3,
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  input: {
    marginBottom: 12,
  },
  checkboxRow: {
    marginVertical: -8,
  },
  divider: {
    marginVertical: 15,
  },
  saveButton: {
    margin: 15,
    marginTop: 5,
    marginBottom: 30,
    paddingVertical: 5,
  },
});
