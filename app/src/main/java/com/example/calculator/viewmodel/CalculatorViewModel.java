package com.example.calculator.viewmodel;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import java.util.ArrayList;
import java.util.List;

public class CalculatorViewModel extends ViewModel {
    private final MutableLiveData<String> currentValue = new MutableLiveData<>("0");
    private final MutableLiveData<List<String>> history = new MutableLiveData<>(new ArrayList<>());
    private final MutableLiveData<String> errorMessage = new MutableLiveData<>();
    
    private Double firstOperand = null;
    private String pendingOperation = "";

    public LiveData<String> getCurrentValue() {
        return currentValue;
    }

    public LiveData<List<String>> getHistory() {
        return history;
    }

    public LiveData<String> getErrorMessage() {
        return errorMessage;
    }

    // Core calculation logic methods
    public void appendNumber(String number) {
        String value = currentValue.getValue();
        if (value.equals("0")) {
            currentValue.setValue(number);
        } else {
            currentValue.setValue(value + number);
        }
    }

    public void setOperation(String operation) {
        try {
            firstOperand = Double.parseDouble(currentValue.getValue());
            pendingOperation = operation;
            currentValue.setValue("0");
        } catch (NumberFormatException e) {
            errorMessage.setValue("Invalid number format");
        }
    }

    public void calculate() {
        if (firstOperand == null || pendingOperation.isEmpty()) return;
        
        try {
            double secondOperand = Double.parseDouble(currentValue.getValue());
            double result = performOperation(firstOperand, secondOperand);
            
            String calculation = firstOperand + " " + pendingOperation + " " + secondOperand + " = " + result;
            List<String> newHistory = new ArrayList<>(history.getValue());
            newHistory.add(calculation);
            history.setValue(newHistory);
            
            currentValue.setValue(String.valueOf(result));
            firstOperand = null;
            pendingOperation = "";
        } catch (NumberFormatException | ArithmeticException e) {
            errorMessage.setValue(e.getMessage());
            currentValue.setValue("0");
            firstOperand = null;
            pendingOperation = "";
        }
    }

    private double performOperation(double first, double second) throws ArithmeticException {
        switch (pendingOperation) {
            case "+": return first + second;
            case "-": return first - second;
            case "×": return first * second;
            case "÷":
                if (second == 0) throw new ArithmeticException("Cannot divide by zero");
                return first / second;
            default: throw new ArithmeticException("Invalid operation");
        }
    }

    public void clear() {
        currentValue.setValue("0");
        firstOperand = null;
        pendingOperation = "";
        errorMessage.setValue(null);
    }
}