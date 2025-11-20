import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

export default function App() {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const n1 = parseFloat(val1);
    const n2 = parseFloat(val2);
    if (isNaN(n1) || isNaN(n2) || !operator) {
      setResult('Erreur');
      return;
    }
    let res;
    switch (operator) {
      case '+': res = n1 + n2; break;
      case '-': res = n1 - n2; break;
      case '*': res = n1 * n2; break;
      default: res = 'Erreur';
    }
    setResult(res);
  };

  const handleClear = () => {
    setVal1('');
    setVal2('');
    setOperator(null);
    setResult(null);
  };

  const operatorButtonStyle = (op) => [
    styles.operatorButton,
    operator === op && styles.operatorButtonSelected,
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Calculatrice</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nombre 1"
          keyboardType="numeric"
          value={val1}
          onChangeText={setVal1}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Nombre 2"
          keyboardType="numeric"
          value={val2}
          onChangeText={setVal2}
        />
        
        <View style={styles.operators}>
          <Pressable style={operatorButtonStyle('+')} onPress={() => setOperator('+')}>
            <Text style={styles.operatorText}>+</Text>
          </Pressable>
          <Pressable style={operatorButtonStyle('-')} onPress={() => setOperator('-')}>
            <Text style={styles.operatorText}>-</Text>
          </Pressable>
          <Pressable style={operatorButtonStyle('*')} onPress={() => setOperator('*')}>
            <Text style={styles.operatorText}>×</Text>
          </Pressable>
        </View>
        
        <Pressable style={styles.button} onPress={handleCalculate}>
          <Text style={styles.buttonText}>Calculer</Text>
        </Pressable>
        
        {result !== null && (
          <View style={styles.resultBox}>
            <Text style={styles.result}>{String(result)}</Text>
          </View>
        )}
        
        <Pressable style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearText}>Effacer</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 18,
  },
  operators: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  operatorButton: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  operatorButtonSelected: {
    backgroundColor: '#333',
  },
  operatorText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultBox: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 20,
    borderRadius: 8,
  },
  result: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  clearButton: {
    padding: 15,
    marginTop: 15,
  },
  clearText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
});
