package com.example.calculator.viewmodel;

import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;

public class CalculatorViewModelTest {
    private CalculatorViewModel viewModel;

    @Before
    public void setUp() {
        viewModel = new CalculatorViewModel();
    }

    @Test
    public void testBasicAddition() {
        viewModel.appendNumber("5");
        viewModel.setOperation("+");
        viewModel.appendNumber("3");
        viewModel.calculate();
        assertEquals("8.0", viewModel.getCurrentValue().getValue());
    }

    @Test
    public void testDivisionByZeroHandling() {
        viewModel.appendNumber("10");
        viewModel.setOperation("÷");
        viewModel.appendNumber("0");
        viewModel.calculate();
        assertNotNull(viewModel.getErrorMessage().getValue());
        assertEquals("0", viewModel.getCurrentValue().getValue());
    }

    @Test
    public void testDecimalOperations() {
        viewModel.appendNumber("2");
        viewModel.appendNumber(".");
        viewModel.appendNumber("5");
        viewModel.setOperation("×");
        viewModel.appendNumber("4");
        viewModel.calculate();
        assertEquals("10.0", viewModel.getCurrentValue().getValue());
    }

    @Test
    public void testHistoryRecording() {
        testBasicAddition();
        assertEquals(1, viewModel.getHistory().getValue().size());
        assertTrue(viewModel.getHistory().getValue().get(0).contains("5.0 + 3.0 = 8.0"));
    }
}