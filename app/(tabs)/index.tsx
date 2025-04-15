import React from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';

const receitasData = [
  {
    id: '1',
    titulo: 'Pipoca',
    ingredientes: ['Milho de pipoca', 'Óleo', 'Sal'],
    preparo: 'Coloque o óleo e o milho na panela. Espere estourar e adicione sal.',
  },
  {
    id: '2',
    titulo: 'Sorvete',
    ingredientes: ['Leite', 'Açúcar', 'Frutas'],
    preparo: 'Misture os ingredientes e congele por algumas horas.',
  },
  {
    id: '3',
    titulo: 'Bolo de Chocolate',
    ingredientes: ['Farinha', 'Chocolate', 'Ovos', 'Leite'],
    preparo: 'Misture os ingredientes e asse por 40 minutos.',
  },
  {
    id: '4',
    titulo: 'Salada de Frutas',
    ingredientes: ['Banana', 'Maçã', 'Morango', 'Laranja'],
    preparo: 'Corte as frutas e misture em uma tigela.',
  },
];

const cardColors = ['#b81414', '#14b8a6', '#b88614', '#145cb8']; // Array de cores

export default function App() {
  const renderReceita = ({ item, index }) => {
    const scaleValue = new Animated.Value(1);

    const handlePressIn = () => {
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableOpacity
        style={[
          styles.receitaCard,
          { transform: [{ scale: scaleValue }] },
          { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
          { backgroundColor: cardColors[index % cardColors.length] }, // Cor de fundo fixa
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.receitaHeader}>
          <Text style={styles.receitaTitulo}>{item.titulo}</Text>
        </View>
        <View style={styles.receitaDetalhes}>
          <Text style={styles.receitaSubtitulo}>Ingredientes:</Text>
          <Text style={styles.receitaTexto}>{item.ingredientes.join(', ')}</Text>
        </View>
        <View style={styles.receitaDetalhes}>
          <Text style={styles.receitaSubtitulo}>Preparo:</Text>
          <Text style={styles.receitaTexto}>{item.preparo}</Text>
        </View>
        <TouchableOpacity style={styles.verReceitaButton}>
          <Text style={styles.verReceitaTexto}>Ver Receita</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>PopCorn and IceCream</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar receitas..."
        editable={false}
      />
      <FlatList
        data={receitasData}
        renderItem={renderReceita}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />} // Separador visual
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  appTitle: {
    fontSize: 28,
    fontFamily: 'Roboto', // Fonte personalizada
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#b81414',
  },
  searchInput: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  receitaCard: {
    marginBottom: 20,
    borderRadius: 8,
    padding: 10, // Adicionado padding para compensar a remoção do gradiente
  },
  receitaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  receitaTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  receitaDetalhes: {
    marginBottom: 8,
  },
  receitaSubtitulo: {
    fontWeight: 'bold',
    color: '#fff',
  },
  receitaTexto: {
    color: '#fff',
  },
  verReceitaButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 3,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  verReceitaTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});