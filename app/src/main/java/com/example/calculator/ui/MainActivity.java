package com.example.calculator.ui;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import com.example.calculator.viewmodel.CalculatorViewModel;
import com.google.android.material.snackbar.Snackbar;
import androidx.recyclerview.widget.RecyclerView;
import com.example.calculator.adapter.HistoryAdapter;

public class MainActivity extends AppCompatActivity {
    private RecyclerView historyList;
    private HistoryAdapter historyAdapter;
    private CalculatorViewModel viewModel;
    private TextView display;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        display = findViewById(R.id.display);
        viewModel = new ViewModelProvider(this).get(CalculatorViewModel.class);

        setupNumberButtons();
        setupOperationButtons();
        setupObservers();
    }

    private void setupNumberButtons() {
        int[] numberIds = {R.id.btn_0, R.id.btn_1, R.id.btn_2, R.id.btn_3, R.id.btn_4,
                          R.id.btn_5, R.id.btn_6, R.id.btn_7, R.id.btn_8, R.id.btn_9};
        
        for (int id : numberIds) {
            findViewById(id).setOnClickListener(v -> {
                viewModel.appendNumber(((TextView)v).getText().toString());
            });
        }
    }

    private void setupOperationButtons() {
        findViewById(R.id.btn_add).setOnClickListener(v -> viewModel.setOperation("+"));
        findViewById(R.id.btn_subtract).setOnClickListener(v -> viewModel.setOperation("-"));
        findViewById(R.id.btn_multiply).setOnClickListener(v -> viewModel.setOperation("×"));
        findViewById(R.id.btn_divide).setOnClickListener(v -> viewModel.setOperation("÷"));
        findViewById(R.id.btn_equals).setOnClickListener(v -> viewModel.calculate());
        findViewById(R.id.btn_clear).setOnClickListener(v -> viewModel.clear());
    }

    private void setupObservers() {
        historyList = findViewById(R.id.history_list);
        historyAdapter = new HistoryAdapter(new ArrayList<>());
        historyList.setLayoutManager(new LinearLayoutManager(this));
        historyList.setAdapter(historyAdapter);

        viewModel.getHistory().observe(this, history -> {
            historyAdapter.updateData(history);
            historyList.scrollToPosition(history.size() - 1);
        });

        viewModel.getCurrentValue().observe(this, value -> {
            display.setText(value);
        });

        viewModel.getErrorMessage().observe(this, error -> {
            if (error != null && !error.isEmpty()) {
                Snackbar.make(findViewById(android.R.id.content), error, Snackbar.LENGTH_LONG).show();
            }
        });
    }
}